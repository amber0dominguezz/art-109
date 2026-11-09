const toast = document.querySelector(".toast");
let toastTimer;

// Reuse one toast and restart its timer whenever a new message is shown.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

// Delegation keeps interactions working for posts added after the page loads.
document.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const likeButton = target.closest(".like-button");
  if (likeButton) {
    const liked = likeButton.getAttribute("aria-pressed") !== "true";
    likeButton.setAttribute("aria-pressed", String(liked));
    likeButton.classList.toggle("is-active", liked);
    likeButton.querySelector(".action-icon").textContent = liked ? "♥" : "♡";
    likeButton.setAttribute("aria-label", `${liked ? "Unlike" : "Like"} this post`);
    const count = likeButton.closest(".post-card").querySelector(".post-reactions > span:nth-child(2)");
    count.textContent = `${Number.parseInt(count.textContent, 10) + (liked ? 1 : -1)} likes`;
    return;
  }

  const saveButton = target.closest(".save-button");
  if (saveButton) {
    const saved = saveButton.getAttribute("aria-pressed") !== "true";
    saveButton.setAttribute("aria-pressed", String(saved));
    saveButton.classList.toggle("is-active", saved);
    showToast(saved ? "Saved to your bookmarks" : "Removed from bookmarks");
    return;
  }

  const followButton = target.closest(".follow-button");
  if (followButton) {
    const following = followButton.getAttribute("aria-pressed") !== "true";
    followButton.setAttribute("aria-pressed", String(following));
    followButton.classList.toggle("is-following", following);
    followButton.textContent = following ? "Following" : "Follow";
    return;
  }

  const commentButton = target.closest(".comment-button");
  if (commentButton) {
    const post = commentButton.closest(".post-card");
    const input = post.querySelector(".comment-input");
    if (input) {
      input.focus();
      return;
    }

    const form = document.createElement("form");
    form.className = "comment-form";
    const field = document.createElement("input");
    field.className = "comment-input";
    field.type = "text";
    field.placeholder = "Write a little something...";
    field.setAttribute("aria-label", "Write a comment");
    const submit = document.createElement("button");
    submit.className = "comment-submit";
    submit.type = "submit";
    submit.textContent = "Send";
    form.append(field, submit);
    post.querySelector(".post-actions").before(form);
    form.addEventListener("submit", (submitEvent) => {
      submitEvent.preventDefault();
      const value = field.value.trim();
      if (!value) {
        field.focus();
        return;
      }

      const comment = document.createElement("p");
      comment.className = "posted-comment";
      const author = document.createElement("strong");
      author.textContent = "Alex Morgan";
      // Insert user input as text so markup in a comment is never interpreted.
      comment.append(author, document.createTextNode(` ${value}`));
      form.before(comment);
      const commentCount = post.querySelector(".reaction-comments");
      commentCount.textContent = `${Number.parseInt(commentCount.textContent, 10) + 1} comments`;
      form.remove();
      showToast("Your comment is on its way ✨");
    });
    field.focus();
    return;
  }

  if (target.closest(".share-button")) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied — pass the good vibes along");
    } catch (error) {
      showToast("Sharing isn't available in this browser");
    }
    return;
  }

  if (target.closest(".story")) {
    showToast("Stories are just getting started");
  }

  if (target.closest(".tool-button")) {
    showToast("Photo and feeling stickers are coming soon");
  }
});

document.querySelectorAll("[data-focus-composer]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#post-text").focus();
    document.querySelector(".composer").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

document.querySelector("#publish-post").addEventListener("click", () => {
  const field = document.querySelector("#post-text");
  const message = field.value.trim();
  if (!message) {
    field.focus();
    showToast("Add a little something before you post");
    return;
  }

  const post = document.createElement("article");
  post.className = "post-card card";
  const header = document.createElement("header");
  header.className = "post-header";
  const avatar = document.createElement("span");
  avatar.className = "avatar avatar-user";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = "A";
  const author = document.createElement("div");
  author.className = "post-author";
  const name = document.createElement("strong");
  name.textContent = "Alex Morgan";
  const time = document.createElement("span");
  time.textContent = "@alexmorgan · just now";
  author.append(name, time);
  header.append(avatar, author);
  const copy = document.createElement("p");
  copy.className = "post-copy";
  copy.textContent = message;
  const reactions = document.createElement("div");
  reactions.className = "post-reactions";
  const reactionIcon = document.createElement("span");
  reactionIcon.className = "reaction-stack";
  reactionIcon.setAttribute("aria-hidden", "true");
  const heart = document.createElement("i");
  heart.textContent = "♥";
  reactionIcon.append(heart);
  const likeCount = document.createElement("span");
  likeCount.textContent = "0 likes";
  const commentCount = document.createElement("span");
  commentCount.className = "reaction-comments";
  commentCount.textContent = "0 comments";
  reactions.append(reactionIcon, likeCount, commentCount);
  const actions = document.createElement("div");
  actions.className = "post-actions";
  const actionDefinitions = [
    { className: "like-button", label: "Like your post", icon: "♡", text: "Like" },
    { className: "comment-button", label: "Comment on your post", icon: "◯", text: "Comment" },
    { className: "share-button", label: "Share your post", icon: "↗", text: "Share" },
    { className: "save-button", label: "Save your post", icon: "♧", text: "" },
  ];
  actionDefinitions.forEach(({ className, label, icon, text }) => {
    const button = document.createElement("button");
    button.className = `action-button ${className}`;
    button.type = "button";
    button.setAttribute("aria-label", label);
    if (className === "like-button" || className === "save-button") {
      button.setAttribute("aria-pressed", "false");
    }
    const symbol = document.createElement("span");
    symbol.className = "action-icon";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = icon;
    button.append(symbol);
    if (text) {
      const caption = document.createElement("span");
      caption.textContent = text;
      button.append(caption);
    }
    actions.append(button);
  });
  // Build the post with DOM nodes and textContent to keep user text inert.
  post.append(header, copy, reactions, actions);
  document.querySelector(".posts").prepend(post);
  field.value = "";
  showToast("Your post is live. Looking good!");
});
