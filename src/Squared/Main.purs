module Squared.Main where

import Control.Monad.Eff
import Debug.Trace

import Data.DOM.Simple.Document
import Data.DOM.Simple.Element
import Data.DOM.Simple.Window

foreign import data Game :: !

foreign import startGame
  "function startGame() {\
  \  return window.startGame();\
  \}" :: forall eff. Eff (startGame :: Game | eff) Unit

main = do
  doc <- document globalWindow
  container <- querySelector ".renderer-container" doc

  -- container >>= setInnerHTML "HI MUM"

  startGame
