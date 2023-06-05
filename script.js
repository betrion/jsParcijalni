const input = document.querySelector("input");
const ul = document.querySelector("ul");
const spinner = document.querySelector(".loading");
input.addEventListener("input", async (e) => {
  await getResults(e.target.value);
});

const getResults = async (searchTerm) => {
  //makni spaceove iz inputa
  ul.innerHTML = "";
  const filtriraniRezultat = searchTerm.replace(/ /g, "+");
  spinner.classList.remove("hidden");
  const response = await fetch(
    `https://itunes.apple.com/search?term=${filtriraniRezultat}&entity=song&limit=20`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const rezultati = data.results;

  rezultati.forEach((pjesma) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="song-pic"><img src="${pjesma.artworkUrl100}"></span>${pjesma.trackName} - ${pjesma.artistName}`;
    ul.appendChild(li);
  });
  spinner.classList.add("hidden");
};
