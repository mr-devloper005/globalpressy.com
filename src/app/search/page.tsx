import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);
  const desc = query
    ? `Matches for your query are pulled from the live index with the same filters and scoring as the rest of the site.`
    : `Start typing in the field below, or scroll the latest items pulled from the wire. Results respect your enabled tasks and the same feed rules as the homepage.`;

  return (
    <PageShell
      eyebrow="Lookup"
      title="Search the archive"
      description={desc}
    >
      <div className="space-y-10">
        <form
          action="/search"
          className="rounded border border-[#2a1f16]/12 bg-[#fffcf7] p-5 shadow-[0_8px_32px_rgba(20,10,5,0.06)] sm:p-6"
        >
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                defaultValue={query}
                placeholder="Headlines, tags, copy in the body…"
                className="h-12 border-[#2a1f16]/12 bg-white pl-10 text-base"
              />
            </div>
            <Button
              type="submit"
              className="h-12 shrink-0 border-0 bg-[#c9a35a] px-8 text-[#1a120c] hover:bg-[#b8934e]"
            >
              Search
            </Button>
          </div>
          {query ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Showing results for <span className="font-medium text-foreground">“{query}”</span>
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Tip: add more words to narrow the list, or open a result to read the full line.</p>
          )}
        </form>

        {results.length ? (
          <div>
            <h2 className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">Results</h2>
            <p className="mt-1 text-sm text-muted-foreground">{results.length} item{results.length === 1 ? "" : "s"}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const postTask = getPostTaskKey(post);
                const href = postTask ? buildPostUrl(postTask, post.slug) : `/posts/${post.slug}`;
                return <TaskPostCard key={post.id} post={post} href={href} />;
              })}
            </div>
          </div>
        ) : (
          <div className="rounded border border-dashed border-[#c9a35a]/40 bg-[rgba(26,20,16,0.04)] px-6 py-14 text-center">
            <p className="font-medium text-foreground">Nothing turned up for that search.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a shorter phrase, check spelling, or browse the latest updates from the home page.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
