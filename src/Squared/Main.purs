module Main where

import Control.Monad.Eff
import Debug.Trace

foreign import data Game :: !

foreign import startGame
  "function startGame() {\
  \  return window.startGame();\
  \}" :: forall eff. Eff (startGame :: Game | eff) Unit

main = do
  startGame
