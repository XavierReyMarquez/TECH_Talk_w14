const newcommentHandler = async (event) => {
  const content = document.querySelector("#user-comment").value.trim();
  if (content) {
    const response = fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};
console.log(result);
document
  .querySelector("#comment-button")
  .addEventListener("click", newcommentHandler);
