function simulerPret() {
  const type = document.querySelector('input[name="loanType"]:checked');
  const montant = parseFloat(document.getElementById("montant").value);
  const duree = parseInt(document.getElementById("duree").value);
  const salaire = parseFloat(document.getElementById("salaire").value);
  const res = document.getElementById("resultat");

  if (!type || !montant || !duree || !salaire) {
    res.className = "mt-4 p-4 bg-red-100 text-red-700 rounded-lg";
    res.textContent = "⚠️ Veuillez remplir tous les champs.";
    res.classList.remove("hidden");
    return;
  }

  const tauxBase = {
    maison: 4.5,
    appartement: 5,
    terrain: 6,
    entreprise: 7,
    cash: 8,
  }[type.value];

  const taux = tauxBase / 100 / 12;
  const mois = duree * 12;
  const mensualite = (montant * taux) / (1 - Math.pow(1 + taux, -mois));
  const total = mensualite * mois;
  const interets = total - montant;

  res.classList.remove("hidden");

  if (mensualite > salaire * 0.4) {
    res.className = "mt-4 p-4 bg-red-100 text-red-700 rounded-lg space-y-2";
    document.getElementById("r-message").textContent =
      "⚠️ Le prêt n'est pas accessible. La mensualité dépasse 40% du salaire";

    document.getElementById("r-type").textContent = "";
    document.getElementById("r-montant").textContent = "";
    document.getElementById("r-taux").textContent = "";
    document.getElementById("r-mensualite").textContent = "";
    document.getElementById("r-interets").textContent = "";
    document.getElementById("r-total").textContent = "";
  } else {
    document.getElementById("r-type").textContent = `Type : ${type.value}`;
    document.getElementById(
      "r-montant"
    ).textContent = `Montant : ${montant.toFixed(2)} MAD`;
    document.getElementById("r-taux").textContent = `Taux : ${tauxBase}%`;
    document.getElementById(
      "r-mensualite"
    ).textContent = `Mensualité : ${mensualite.toFixed(2)} MAD`;
    document.getElementById(
      "r-interets"
    ).textContent = `Total intérêts : ${interets.toFixed(2)} MAD`;
    document.getElementById(
      "r-total"
    ).textContent = `Total à rembourser : ${total.toFixed(2)} MAD`;

    res.className = "mt-4 p-4 bg-green-100 text-green-700 rounded-lg space-y-2";
    document.getElementById("r-message").textContent =
      "✅ Simulation réussie !";
  }
}

document.getElementById("simuler").addEventListener("click", simulerPret);
