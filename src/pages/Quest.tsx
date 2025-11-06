import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import FloatingDecor from "../components/FloatingDecor";
import Riddle from "../components/Riddle";
import { GameLayout } from "../components/GameLayout";
import React from "react";
import { CatchButton } from '../components/games/CatchButton';
import { CodePuzzle } from '../components/games/CodePuzzle';
import { MemoryGame } from '../components/games/FindEmoji';
import { MazeMini } from '../components/games/MazeMini';
import { TapRush } from '../components/games/TapRush';
import { GameType, questSteps } from '../data/questSteps';
import { CatchGame } from '../components/games/FallingItem';
import { CatchFallingObjects } from '../components/games/CatchFallingObjects';
import { SimonSays } from '../components/games/SimonSays';
import { MathQuiz } from '../components/games/MathQuiz';


const gameComponents: Record<GameType, React.ComponentType<any>> = {
  tapRush: TapRush,
  catchButton: CatchButton,
  findEmoji: MemoryGame,
  codePuzzle: CodePuzzle,
  mazeMini: MazeMini,
  catchGame: CatchGame,
  catchFallingObjects: CatchFallingObjects,
  simonSays: SimonSays,
  mathQuiz: MathQuiz
};

export default function QuestPage() {
  const { id } = useParams();
  const step = questSteps.find((s) => s.id === Number(id));

  if (!step)
    return (
      <PageLayout>
        <div className="text-white text-2xl font-bold">Этап не найден 🚫</div>
      </PageLayout>
    );

  const GameComponent = step.game ? gameComponents[step.game.type] : null;

  return (
    <PageLayout>
      <FloatingDecor />
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="text-4xl font-extrabold text-white drop-shadow-lg mb-6"
      >
        Загадка номер {step.id}
      </motion.h1>

      {step.game && GameComponent ? (
        <GameLayout
          title={step.game.name}
          rules={step.game.rule}
          Game={GameComponent}
          riddle={step.riddle}
        />
      ) : (
        <Riddle text={step.riddle} />
      )}
    </PageLayout>
  );
}
