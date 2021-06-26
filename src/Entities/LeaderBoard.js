import 'regenerator-runtime/runtime';

const leaderboard = (() => {
  const compare = (c, d) => {
    if (c.score > d.score) return -1;
    if (c.score < d.score) return 1;
    return 0;
  };
  const savedScore = async (name, score) => {
    const result = { user: name, score };
    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/KPZHKs1awJtHS6mGcPkl/scores',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(result),
      },
    ).then((response) => {
      response.json();
    });
  };

  // Load Score or Fetch Score from API
  const receivedScore = async () => {
    const Scores = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/KPZHKs1awJtHS6mGcPkl/scores',
      {
        mode: 'cors',
      },
    );
    return Scores.json();
  };

  // Display received Store to User
  const displayedScore = async (scene) => {
    const Scores = await receivedScore();
    const ScoreList = Scores.result;
    ScoreList.sort(compare);
    const size = ScoreList.length > 18 ? 18 : ScoreList.length;
    for (let i = 0; i < size; i += 1) {
      scene.add.text(350, 24 * i + 45, `${ScoreList[i].user} : ${ScoreList[i].score}`, { fontSize: 20 }).setOrigin(0.5);
    }
  };
  return { savedScore, receivedScore, displayedScore };
})();

export default leaderboard;