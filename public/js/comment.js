const newcommentHandler = async (event) => {
  const content = document.querySelector("#user-comment").value.trim();
  const post_id = location.href.split("/")[location.href.split("/").length - 1];
  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#comment-button")
  .addEventListener("click", newcommentHandler);
