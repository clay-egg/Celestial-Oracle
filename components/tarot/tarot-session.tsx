"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ALL_TAROT_CARDS, shuffleDeck, type TarotCard } from "@/lib/tarot-data";
import { useLanguage } from "@/lib/language-context";
import { Sparkles, Star, RotateCcw, Loader2, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage =
  | "intro"       // Question form
  | "shuffling"   // Animate shuffle
  | "spread"      // 78 cards face-down, pick 3
  | "arranging"   // Move 3 chosen cards to positions
  | "revealing"   // Flip cards one by one
  | "reading";    // Show interpretation

interface DrawnCard {
  card: TarotCard;
  position: "past" | "present" | "future";
  revealed: boolean;
}

interface TarotInterpretation {
  interpretation: string;
  interpretationTh: string;
  pastMessage: string;
  pastMessageTh: string;
  presentMessage: string;
  presentMessageTh: string;
  futureMessage: string;
  futureMessageTh: string;
  advice: string;
  adviceTh: string;
  affirmation: string;
  affirmationTh: string;
}

// ─── Spread geometry ──────────────────────────────────────────────────────────
// Dynamically calculate the fan radius and pivot so it perfectly fits the container width
function computeSpreadPositions(
  count: number,
  containerW: number,
) {
  const isMobile = containerW < 640;

  // Card size
  const cardW = isMobile ? 44 : 58;
  const cardH = isMobile ? 74 : 96;

  // Total fan spread in degrees
  const totalArc = isMobile ? 130 : 140;
  const halfArc = totalArc / 2;
  const halfArcRad = (halfArc * Math.PI) / 180;

  // Ensure the fan width takes up most of the container but leaves a tiny margin
  const maxFanWidth = containerW * (isMobile ? 0.98 : 0.92);
  const radius = maxFanWidth / (2 * Math.sin(halfArcRad));

  // The center card is at the top of the arc. Add some padding from the top edge.
  const topPadding = isMobile ? 20 : 40;

  // Pivot point is placed below so the center card lands exactly at topPadding
  const pivotY = radius + cardH / 2 + topPadding;
  const pivotX = containerW / 2;

  // Calculate required container height based on the lowest cards (the edges of the fan)
  const cy_edge = pivotY - radius * Math.cos(halfArcRad);
  const containerH = cy_edge + cardH / 2 + (isMobile ? 10 : 30);

  const positions = Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angleDeg = -halfArc + t * totalArc;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Center of the card in container coordinates
    const cx = pivotX + radius * Math.sin(angleRad);
    const cy = pivotY - radius * Math.cos(angleRad);

    // Top-left of the card (Framer Motion origin)
    const x = cx - cardW / 2;
    const y = cy - cardH / 2;

    return { x, y, rotate: angleDeg, cardW, cardH, zIndex: i };
  });

  return { positions, containerH };
}

// ─── CardBack component ────────────────────────────────────────────────────────
function CardBack({ width, height }: { width?: number | string; height?: number | string }) {
  // If numeric values are provided, use them as inline styles, otherwise let it fill container
  const style = (width && height) ? { width, height } : { width: "100%", height: "100%" };

  return (
    <div
      className="rounded-lg border-2 border-primary/60 overflow-hidden flex items-center justify-center relative"
      style={{
        ...style,
        background: "linear-gradient(135deg, #12122a 0%, #1a1a3e 40%, #0e0e24 100%)",
        boxShadow: "inset 0 0 10px rgba(201,168,76,0.15)",
      }}
    >
      <div
        className="rounded border border-primary/30 flex items-center justify-center absolute"
        style={{
          width: "80%",
          height: "85%",
          background: "linear-gradient(135deg, #1e1e40, #141428)",
        }}
      >
        <svg viewBox="0 0 40 40" className="w-1/2 h-1/2 opacity-70">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="2" fill="#c9a84c" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={20 + 5 * Math.cos(r)} y1={20 + 5 * Math.sin(r)}
                x2={20 + 17 * Math.cos(r)} y2={20 + 17 * Math.sin(r)}
                stroke="#c9a84c" strokeWidth="0.5" opacity="0.6"
              />
            );
          })}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <polygon
                key={deg}
                points={`${20 + 3 * Math.cos(r)},${20 + 3 * Math.sin(r)} ${20 + 6 * Math.cos(r + 0.5)},${20 + 6 * Math.sin(r + 0.5)} ${20 + 6 * Math.cos(r - 0.5)},${20 + 6 * Math.sin(r - 0.5)}`}
                fill="#c9a84c" opacity="0.4"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── Single face-down spread card ─────────────────────────────────────────
function SpreadCard({
  x, y, rotate, cardW, cardH, zIndex, index,
  isSelected, isDisabled, isTouchHovered, onClick,
}: {
  x: number; y: number; rotate: number; cardW: number; cardH: number;
  zIndex: number; index: number;
  isSelected: boolean; isDisabled: boolean; isTouchHovered: boolean; onClick: () => void;
}) {
  // Stagger: cards fan out from center outward, capped at 400ms total
  const delay = Math.min(index / 78, 1) * 0.4;

  return (
    <motion.button
      className="absolute cursor-pointer focus:outline-none select-none"
      style={{ top: 0, left: 0, zIndex: isSelected ? 100 : (isTouchHovered ? 200 : zIndex), willChange: "transform" }}
      initial={{ x, y: y + 60, rotate: 0, opacity: 0, scale: 0.7 }}
      animate={{
        x,
        y: isSelected ? y - 28 : (isTouchHovered ? y - 18 : y),
        rotate: isSelected ? 0 : rotate,
        opacity: isDisabled && !isSelected ? 0.4 : 1,
        scale: isSelected ? 1.12 : (isTouchHovered ? 1.12 : 1),
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
        delay,
        opacity: { duration: 0.25, delay },
        scale: { duration: 0.25, delay },
      }}
      whileHover={!isDisabled && !isSelected ? { y: y - 18, scale: 1.12, zIndex: 200 } : {}}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label="Select this tarot card"
    >
      <div
        className="relative"
        style={{
          filter: isSelected
            ? "drop-shadow(0 0 16px rgba(212,170,80,1)) drop-shadow(0 0 32px rgba(212,170,80,0.6))"
            : (isTouchHovered
              ? "drop-shadow(0 0 12px rgba(212,170,80,0.8))"
              : "drop-shadow(0 3px 8px rgba(0,0,0,0.6))"),
          transition: "filter 0.2s ease",
        }}
      >
        <CardBack width={cardW} height={cardH} />
        {(isSelected || isTouchHovered) && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 2px #d4aa50" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
    </motion.button>
  );
}

// ─── Flip card (front/back) ────────────────────────────────────────────────────
function FlipCard({
  card, isRevealed, label, delay = 0,
}: {
  card: TarotCard; isRevealed: boolean; label: string; delay?: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 shrink-0 snap-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
    >
      <p className="font-sans text-xs text-primary uppercase tracking-widest">{label}</p>
      <div className="w-[140px] h-[234px] sm:w-[120px] sm:h-[200px]" style={{ perspective: 900 }}>
        <motion.div
          style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%" }}
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isRevealed ? 0 : 180 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Front */}
          <div
            style={{
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              position: "absolute", inset: 0,
              transform: "rotateY(0deg)",
            }}
          >
            <div
              className="w-full h-full rounded-xl overflow-hidden border-2 border-primary/50 shadow-2xl relative"
              style={{ boxShadow: "0 0 30px rgba(212,170,80,0.3)" }}
            >
              <Image
                src={card.imageUrl}
                alt={card.name}
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 100px, 120px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          {/* Back */}
          <div
            style={{
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              position: "absolute", inset: 0,
              transform: "rotateY(180deg)",
            }}
            className="w-full h-full"
          >
            <CardBack width="100%" height="100%" />
          </div>
        </motion.div>
      </div>
      {isRevealed && (
        <motion.p
          className="font-sans text-sm text-foreground text-center font-semibold tracking-wide"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          {card.name}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Main Session Component ────────────────────────────────────────────────────
export function TarotSession() {
  const { t, lang } = useLanguage();
  const [stage, setStage] = useState<Stage>("intro");
  const [question, setQuestion] = useState("");
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<(number | null)[]>([null, null, null]);
  const selectedCount = selectedIndices.filter((idx) => idx !== null).length;
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [interpretation, setInterpretation] = useState<TarotInterpretation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  // Reference to track container element bounds for touch gesture math
  const containerElementRef = useRef<HTMLDivElement | null>(null);
  const [activeTouchIndex, setActiveTouchIndex] = useState<number | null>(null);

  // Callback ref: executes exactly when AnimatePresence finally mounts the div
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    containerElementRef.current = node;
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node) {
      setContainerW(node.clientWidth);
      const ro = new ResizeObserver(() => setContainerW(node.clientWidth));
      ro.observe(node);
      observerRef.current = ro;
    }
  }, []);

  const { positions, containerH } = useMemo(
    () => containerW > 0 ? computeSpreadPositions(deck.length, containerW) : { positions: [], containerH: 300 },
    [deck.length, containerW],
  );


  // Stage: intro → shuffling
  const startReading = useCallback(() => {
    setStage("shuffling");
    setTimeout(() => {
      setDeck(shuffleDeck(ALL_TAROT_CARDS));
      setSelectedIndices([null, null, null]);
      setStage("spread");
    }, 1800);
  }, []);

  // Stage: spread — pick a card
  const pickCard = useCallback((idx: number) => {
    setSelectedIndices((prev) => {
      if (prev.includes(idx)) return prev;
      const emptyIdx = prev.indexOf(null);
      if (emptyIdx === -1) return prev; // All slots filled
      const next = [...prev];
      next[emptyIdx] = idx;
      return next;
    });
  }, []);

  const removeCard = useCallback((itemIndex: number) => {
    setSelectedIndices((prev) => {
      const next = [...prev];
      next[itemIndex] = null;
      return next;
    });
  }, []);

  const confirmSelection = useCallback(() => {
    if (selectedCount !== 3) return;
    const positions: ("past" | "present" | "future")[] = ["past", "present", "future"];
    const drawn: DrawnCard[] = selectedIndices.map((cardIdx, i) => ({
      card: deck[cardIdx!],
      position: positions[i],
      revealed: false,
    }));
    setDrawnCards(drawn);
    setRevealedCount(0);
    setStage("arranging");

    // Start revealing after arrange animation
    setTimeout(() => {
      setStage("revealing");
      // Reveal cards one by one
      [0, 1, 2].forEach((i) => {
        setTimeout(() => {
          setRevealedCount(i + 1);
        }, i * 1200);
      });
      // Fetch AI after all revealed
      setTimeout(() => fetchInterpretation(drawn), 3800);
    }, 900);
  }, [selectedIndices, selectedCount, deck]);

  const fetchInterpretation = async (drawn: DrawnCard[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards: drawn.map(d => d.card), question }),
      });
      if (!res.ok) throw new Error("The cosmic veil could not be lifted.");
      const data = await res.json();
      setInterpretation(data);
      setStage("reading");
    } catch (err) {
      setError("The stars could not be reached. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStage("intro");
    setQuestion("");
    setDeck([]);
    setSelectedIndices([null, null, null]);
    setDrawnCards([]);
    setInterpretation(null);
    setError(null);
    setRevealedCount(0);
  };

  // Find the closest non-disabled card to a given screen touch point
  const getClosestCardIndex = useCallback((clientX: number, clientY: number) => {
    if (!containerElementRef.current || positions.length === 0) return null;

    const rect = containerElementRef.current.getBoundingClientRect();
    const touchX = clientX - rect.left;
    const touchY = clientY - rect.top;

    let closestIdx = -1;
    let minDistance = Infinity;

    positions.forEach((pos, idx) => {
      const isSelected = selectedIndices.includes(idx);
      const isDisabled = selectedCount >= 3 && !isSelected;
      if (isDisabled) return;

      const centerX = pos.x + pos.cardW / 2;
      const centerY = pos.y + pos.cardH / 2;

      const dx = touchX - centerX;
      const dy = touchY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    // If the touch is more than 150px away from the closest card center, cancel touch hover
    if (minDistance > 150) {
      return null;
    }

    return closestIdx;
  }, [positions, selectedIndices, selectedCount]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (stage !== "spread") return;
    const touch = e.touches[0];
    const idx = getClosestCardIndex(touch.clientX, touch.clientY);
    if (idx !== null) {
      setActiveTouchIndex(idx);
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    }
  }, [stage, getClosestCardIndex]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (stage !== "spread") return;
    const touch = e.touches[0];
    const idx = getClosestCardIndex(touch.clientX, touch.clientY);
    if (idx !== activeTouchIndex) {
      setActiveTouchIndex(idx);
      if (idx !== null && typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    }
  }, [stage, activeTouchIndex, getClosestCardIndex]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (stage !== "spread") return;
    if (activeTouchIndex !== null) {
      if (e.cancelable) {
        e.preventDefault(); // Stop click simulation
      }
      pickCard(activeTouchIndex);
    }
    setActiveTouchIndex(null);
  }, [stage, activeTouchIndex, pickCard]);

  const handleTouchCancel = useCallback(() => {
    setActiveTouchIndex(null);
  }, []);

  const POSITION_LABELS = {
    past: t("tarot.past"),
    present: t("tarot.present"),
    future: t("tarot.future"),
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <section className="relative py-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-sans gold-text tracking-wider">
              {t("tarot.title")}
            </h2>
            <Star className="w-6 h-6 text-primary" />
          </div>
          <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("tarot.subtitle")}
          </p>
        </div>

        {/* ── Stage: INTRO ── */}
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div
              key="intro"
              className="reading-result rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            >
              {/* Deck preview */}
              <div className="flex justify-center mb-8">
                <div className="relative w-28 h-44">
                  {[4, 3, 2, 1, 0].map((i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{ transform: `rotate(${(i - 2) * 3}deg) translateY(${i * 2}px)`, top: 0, left: 0 }}
                    >
                      <CardBack width={112} height={176} />
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-center font-sans text-2xl text-foreground mb-3 tracking-wide">
                {t("tarot.begin_title")}
              </h3>
              <p className="text-center font-serif text-muted-foreground mb-8 max-w-lg mx-auto">
                {t("tarot.begin_desc")}
              </p>

              <div className="max-w-lg mx-auto mb-8">
                <label className="block font-sans text-sm text-primary uppercase tracking-widest mb-2">
                  {t("tarot.question_label")}
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value.slice(0, 250))}
                  placeholder={t("tarot.question_placeholder")}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground font-serif placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none text-base"
                />
                <p className="text-xs text-muted-foreground/70 mt-1 font-serif text-right">
                  {question.length}/250 · {t("tarot.optional")}
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={startReading}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all animate-glow-pulse"
                >
                  <Sparkles className="w-5 h-5" />
                  {t("tarot.begin_btn")}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Stage: SHUFFLING ── */}
          {stage === "shuffling" && (
            <motion.div
              key="shuffling"
              className="flex flex-col items-center justify-center py-24"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="relative w-32 h-48 mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ top: 0, left: 0 }}
                    animate={{
                      x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 15), 0],
                      rotate: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 8), (i - 2) * 3],
                      y: [0, -10 - i * 5, i * 2],
                    }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeInOut" }}
                  >
                    <CardBack width={128} height={192} />
                  </motion.div>
                ))}
              </div>
              <p className="font-serif text-xl text-muted-foreground animate-pulse">
                {t("tarot.shuffling")}
              </p>
            </motion.div>
          )}

          {/* ── Stage: SPREAD ── */}
          {stage === "spread" && (
            <motion.div
              key="spread"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="text-center mb-6">
                <p className="font-sans text-lg text-foreground tracking-wide">
                  {t("tarot.pick_prompt")}
                  <span className="text-primary ml-2">
                    {selectedCount}/3
                  </span>
                </p>
                <p className="font-serif text-muted-foreground text-sm mt-1">
                  {t("tarot.pick_sub")}
                </p>
              </div>

              {/* Fan spread container */}
              <div
                ref={containerRef}
                className="relative mx-auto overflow-visible w-full select-none"
                style={{ height: containerH, maxWidth: 960, touchAction: "none" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
              >
                {/* Mystical table glow at the bottom of the fan */}
                <div
                  className="absolute bottom-0 left-1/2 pointer-events-none"
                  style={{
                    transform: "translateX(-50%)",
                    width: "80%",
                    height: 40,
                    background: "radial-gradient(ellipse at center, rgba(212,170,80,0.18) 0%, transparent 70%)",
                    filter: "blur(8px)",
                  }}
                />
                {containerW > 0 && deck.map((_, idx) => {
                  const pos = positions[idx];
                  if (!pos) return null;
                  const isSelected = selectedIndices.includes(idx);
                  const isDisabled = selectedCount >= 3 && !isSelected;
                  const isTouchHovered = activeTouchIndex === idx;
                  return (
                    <SpreadCard
                      key={idx}
                      index={idx}
                      {...pos}
                      isSelected={isSelected}
                      isDisabled={isDisabled}
                      isTouchHovered={isTouchHovered}
                      onClick={() => pickCard(idx)}
                    />
                  );
                })}
              </div>


              {/* Selected Cards Display (instead of 3 bullets) */}
              <div className="max-w-md mx-auto mt-10 px-4">
                <p className="text-center font-sans text-xs text-muted-foreground uppercase tracking-widest mb-4">
                  {t("tarot.your_spread")}
                </p>
                <div className="grid grid-cols-3 gap-4 justify-center items-center">
                  {[0, 1, 2].map((i) => {
                    const isPicked = selectedIndices[i] !== null;
                    const label = i === 0 ? POSITION_LABELS.past : i === 1 ? POSITION_LABELS.present : POSITION_LABELS.future;

                    return (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div 
                          className={`relative w-12 sm:w-16 md:w-20 aspect-[100/167] rounded-lg transition-all duration-300 ${
                            isPicked 
                              ? "shadow-[0_0_15px_rgba(212,170,80,0.2)]" 
                              : "border border-dashed border-primary/20 bg-secondary/20 flex flex-col items-center justify-center"
                          }`}
                        >
                          {isPicked ? (
                            <motion.div 
                              className="w-full h-full relative"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <CardBack />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeCard(i);
                                }}
                                className="absolute -top-2 -right-2 bg-secondary border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                                aria-label="Remove card"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </motion.div>
                          ) : (
                            <span className="text-[10px] sm:text-xs text-muted-foreground/40 font-sans font-semibold uppercase tracking-wider">
                              ?
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-xs font-sans text-muted-foreground uppercase tracking-widest text-center">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reveal/Confirm Button */}
              {selectedCount === 3 && (
                <motion.div 
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={confirmSelection}
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all animate-glow-pulse shadow-xl cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    {t("tarot.reveal_reading")}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Stage: ARRANGING / REVEALING ── */}
          {(stage === "arranging" || stage === "revealing") && (
            <motion.div
              key="revealing"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              {stage === "arranging" && (
                <p className="font-serif text-xl text-muted-foreground animate-pulse mb-8">
                  {t("tarot.arranging")}
                </p>
              )}
              {stage === "revealing" && (
                <p className="font-serif text-xl text-muted-foreground mb-8">
                  {t("tarot.revealing")}
                </p>
              )}

              {/* Carousel Container for Mobile, Side-by-Side on Desktop */}
              <div className="flex flex-row gap-6 sm:gap-10 lg:gap-12 items-start justify-start sm:justify-center w-full px-8 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                {drawnCards.map((drawn, i) => (
                  <FlipCard
                    key={drawn.card.id}
                    card={drawn.card}
                    isRevealed={revealedCount > i}
                    label={POSITION_LABELS[drawn.position]}
                    delay={i * 0.15}
                  />
                ))}
              </div>

              {isLoading && (
                <motion.div
                  className="flex items-center gap-3 mt-10 font-serif text-muted-foreground"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                >
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  {t("tarot.interpreting")}
                </motion.div>
              )}

              {error && (
                <div className="mt-8 text-center">
                  <p className="font-serif text-destructive">{error}</p>
                  <button onClick={reset} className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all">
                    {t("tarot.try_again")}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Stage: READING ── */}
          {stage === "reading" && interpretation && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Three revealed cards (Carousel on mobile, static on desktop) */}
              <div className="flex flex-row gap-6 sm:gap-10 justify-start sm:justify-center items-start mb-8 w-full px-8 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                {drawnCards.map((drawn, i) => (
                  <motion.div
                    key={drawn.card.id}
                    className="flex flex-col items-center gap-3 shrink-0 snap-center w-[140px] sm:w-[120px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <p className="font-sans text-xs text-primary uppercase tracking-widest text-center">
                      {POSITION_LABELS[drawn.position]}
                    </p>
                    <div
                      className="w-full aspect-[100/167] rounded-xl overflow-hidden border-2 border-primary/40 shadow-2xl relative"
                      style={{ boxShadow: "0 0 20px rgba(212,170,80,0.25)" }}
                    >
                      <Image
                        src={drawn.card.imageUrl}
                        alt={drawn.card.name}
                        fill
                        sizes="140px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <p className="font-sans text-sm text-foreground text-center font-semibold">{drawn.card.name}</p>
                    <p className="text-xs text-muted-foreground text-center font-serif max-w-[120px]">
                      {drawn.card.keywords.slice(0, 2).join(" · ")}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Combined interpretation */}
              <motion.div
                className="reading-result rounded-2xl p-8 md:p-10"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-sans text-xl gold-text tracking-wider">{t("tarot.the_reading")}</h3>
                </div>

                {question && (
                  <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-primary/10">
                    <p className="text-xs font-sans text-primary uppercase tracking-widest mb-1">{t("tarot.your_question")}</p>
                    <p className="font-serif text-foreground italic">"{question}"</p>
                  </div>
                )}

                <p className="font-serif text-xl text-foreground leading-relaxed mb-8">
                  {lang === "th" ? interpretation.interpretationTh : interpretation.interpretation}
                </p>

                {/* Per-card messages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {drawnCards.map((drawn, i) => {
                    const msgKey = drawn.position as "past" | "present" | "future";
                    const msgEn = { past: interpretation.pastMessage, present: interpretation.presentMessage, future: interpretation.futureMessage }[msgKey];
                    const msgTh = { past: interpretation.pastMessageTh, present: interpretation.presentMessageTh, future: interpretation.futureMessageTh }[msgKey];
                    return (
                      <div key={i} className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                        <p className="text-xs font-sans text-primary uppercase tracking-widest mb-2">
                          {POSITION_LABELS[drawn.position]} · {drawn.card.name}
                        </p>
                        <p className="font-serif text-foreground text-sm leading-relaxed">
                          {lang === "th" ? msgTh : msgEn}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Advice */}
                <div className="mb-6 p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
                  <p className="text-xs font-sans text-primary uppercase tracking-widest mb-2">{t("tarot.oracle_advice")}</p>
                  <p className="font-serif text-lg text-foreground leading-relaxed">
                    {lang === "th" ? interpretation.adviceTh : interpretation.advice}
                  </p>
                </div>

                {/* Affirmation */}
                <div className="p-5 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                  <p className="text-xs font-sans text-muted-foreground uppercase tracking-widest mb-3">{t("tarot.affirmation")}</p>
                  <p className="font-serif text-xl text-primary leading-relaxed italic">
                    "{lang === "th" ? interpretation.affirmationTh : interpretation.affirmation}"
                  </p>
                </div>

                {/* Individual card meanings */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-sans text-muted-foreground uppercase tracking-widest">{t("tarot.card_meanings")}</p>
                  {drawnCards.map((drawn) => (
                    <div key={drawn.card.id} className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                      <p className="font-sans text-sm text-primary mb-1">{drawn.card.name}</p>
                      <p className="font-serif text-sm text-foreground leading-relaxed">{drawn.card.upright}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t("tarot.new_reading")}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
