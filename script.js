const input = document.querySelector("input");

const ul = document.querySelector("ul");
const spinner = document.querySelector(".loading");
input.addEventListener("input", async (e) => {
  await getResults(e.target.value);
});

const getResults = async (searchTerm) => {
  spinner.classList.remove("hidden");
  const response = await axios.get(
    `https://itunes.apple.com/search?term=${searchTerm}&entity=song`,
  );
  console.log(response.data);
  spinner.classList.add("hidden");
};
