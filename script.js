const input = document.querySelector("input");
const ul = document.querySelector("ul");
const spinner = document.querySelector(".loading");
const noResults = document.querySelector(".no-results");

input.addEventListener("input", async (e) => {
  if (e.target.value.length === 0) {
    ul.innerHTML = "";
    spinner.classList.add("hidden");
    noResults.classList.add("hidden");
    return;
  }
  await getResults(e.target.value);
});

const getResults = async (searchTerm) => {
  ul.innerHTML = "";
  //makni spaceove iz inputa
  const filtriraniRezultat = searchTerm.replace(/ /g, "+");

  spinner.classList.remove("hidden");
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${filtriraniRezultat}&entity=song&limit=20`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      noResults.classList.remove("hidden");
      throw new Error("Network response was not ok");
    }

    noResults.classList.add("hidden");
    const data = await response.json();
    const rezultati = data.results;
    console.log(rezultati);
    if (rezultati.length === 0) {
      noResults.classList.remove("hidden");
    } else {
      noResults.classList.add("hidden");
      rezultati.forEach((pjesma) => {
        const li = document.createElement("li");
        li.innerHTML = `<span><img src="${pjesma.artworkUrl100}"></span>${pjesma.artistName} - ${pjesma.trackName}`;
        ul.appendChild(li);
      });
    }
  } catch (error) {
    noResults.classList.remove("hidden");
    console.error("Error fetching data:", error);
  }

  spinner.classList.add("hidden");
};
