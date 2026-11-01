<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep editable workshop content, keepsake data and asset references in `src/config/content.ts`; scene controls render this data so content changes do not require interaction changes.
- Render drawer browsing in a dedicated keepsake view; preserve the radio iframe across expanded and minimized states and derive musical notes from playback events.
