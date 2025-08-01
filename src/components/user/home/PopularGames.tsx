"use client";

import Container from "@/components/global/Container/Container";
import Game from "@/components/global/game/Game";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import GameHorizontal from "@/components/global/game/GameHorizontal";

interface IPopularGamesProps {
  popularGames: IGame[];
}

const PopularGames: React.FC<IPopularGamesProps> = ({ popularGames }) => {
  const [limit, setLimit] = useState(12);
  const limitedPopularGames = popularGames.slice(0, limit);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (screenWidth < 600) {
  //     setLimit(9);
  //   } else if (screenWidth < 900) {
  //     setLimit(9);
  //   } else {
  //     setLimit(12);
  //   }
  // }, [screenWidth]);

  const handleClickExpandGame = () => {
    if (limit > popularGames.length) {
      setLimit(12);
    } else {
      setLimit((prevLimit) => prevLimit + 12);
    }
  };

  return (
    <Container className="pt-10 md:pt-12">
      <div>
        <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          🔥 Sedang Populer 🔥
        </h2>
        {/* <p className="text-neutral-800 lg:text-lg md:w-3/4 lg:w-2/3 mx-auto text-center mt-4">
          mainkan game terpopuler saat ini dan segera top up 
        </p> */}

        <div className="mt-4 md:mt-6 lg:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {limitedPopularGames.map((data) => (
            <>
              <GameHorizontal data={data} key={data.id}/>
            </>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularGames;
