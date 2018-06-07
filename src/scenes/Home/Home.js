import React from "react";
import InfoCard from "../../components/InfoCard";
import "./Home.css";

const HomePage = () => (
  <div className="ur-home">
    <InfoCard
      title="Endless Content"
      body="All cards are generated completely from scratch, from their name to their stats and abilities. Every card is brand new, never seen before!"
    />
    <InfoCard
      title="Dynamic Gameplay"
      body="With exciting card mechanics and an always fresh card pool, every deck you create will have its own totally unique feel."
    />
    <InfoCard
      title="True Balance"
      body="As games go on, generated cards are monitored for their performance and usage. The card generation algorithm is always tweaking itself as it finds new trends and breakout strategies."
    />
  </div>
);

export default HomePage;
