import * as React from "react";
import GestureView, { PagerIndex } from "react-page-controller";
import { ArrowRight, ArrowLeft } from "./Icons";
import { Indicators } from "./Indicators";

export interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  index: PagerIndex;
  onRequestChange: (i: number) => void;
  children: React.ReactNodeArray;
  enableKeyboard?: boolean;
  enableIndicators?: boolean;
  enableControls?: boolean;
}

export function Gallery({
  index: providedIndex,
  onRequestChange,
  enableKeyboard = true,
  enableIndicators = true,
  enableControls = true,
  children,
  ...other
}: GalleryProps) {
  // optionally allow the user to pass in an object
  // with an index and animated property. This allows
  // the user to skip to an index without animating.

  let { immediate, index } =
    typeof providedIndex === "number"
      ? { immediate: false, index: providedIndex }
      : providedIndex;

  function onKeyDown(e: KeyboardEvent) {
    // left
    if (e.keyCode === 37) {
      if (index > 0) {
        onRequestChange(index - 1);
        return true;
      }

      // right
    } else if (e.keyCode === 39) {
      if (index < totalChildren - 1) {
        onRequestChange(index + 1);
        return true;
      }
    }

    return false;
  }

  React.useEffect(() => {
    if (enableKeyboard) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index]);

  const totalChildren = React.Children.count(children);
  const hasPrev = index > 0;
  const hasNext = index < totalChildren - 1;

  const timerRef = React.useRef<any>(null);

  const [showControls, setShowControls] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  /**
   * Enable 'hover' based controls
   */

  function onMouseMove() {
    if (!showControls) {
      setShowControls(true);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }

  function onEnter() {
    setHover(true);
  }

  function onLeave() {
    setHover(false);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className="GestureGallery"
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
      {...other}
    >
      <GestureView
        enableMouse
        focusOnChange
        style={{
          width: "100%",
          height: "100%"
        }}
        value={providedIndex}
        onRequestChange={onRequestChange}
        lazyLoad
        onSetLazy={i => {
          const indexes = [i];
          if (i > 0) {
            indexes.unshift(i - 1);
          }

          if (i < totalChildren) {
            indexes.push(i + 1);
          }

          return indexes;
        }}
      >
        {children}
      </GestureView>
      {enableControls && (
        <React.Fragment>
          <NavigationArrow
            aria-label="Show previous image"
            hidden={!hasPrev}
            onEnter={onEnter}
            onLeave={onLeave}
            visible={(hover || showControls) && hasPrev}
            onClick={() => {
              onRequestChange(index - 1);
            }}
            style={{
              left: "1rem"
            }}
          >
            <ArrowLeft />
          </NavigationArrow>
          <NavigationArrow
            aria-label="Show next image"
            hidden={!hasNext}
            visible={(hover || showControls) && hasNext}
            onEnter={onEnter}
            onLeave={onLeave}
            onClick={() => {
              onRequestChange(index + 1);
            }}
            style={{
              right: "1rem"
            }}
          >
            <ArrowRight />
          </NavigationArrow>
        </React.Fragment>
      )}
      {enableIndicators && (
        <Indicators visible count={totalChildren} index={index} />
      )}
    </div>
  );
}

interface NavigationArrowProps {
  visible: boolean;
  style?: React.CSSProperties;
  hidden: boolean;
  onClick: () => void;
  children: React.ReactNode;
  "aria-label": string;
  onEnter: () => void;
  onLeave: () => void;
}

export function NavigationArrow({
  hidden,
  children,
  "aria-label": label,
  onClick,
  onEnter,
  onLeave,
  visible,
  style
}: NavigationArrowProps) {
  return (
    <div
      className="Gallery__NavigationArrow"
      aria-label={label}
      aria-hidden={hidden}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        transition: "opacity 0.5s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        ...style
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          background: "rgba(255,255,255,0.7)",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",

          border: "none"
        }}
      >
        {children}
      </button>
    </div>
  );
}

interface GalleryImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  srcSet?: string;
  caption?: string;
  alt?: string;
  objectFit?: "cover" | "contain";
}

export function GalleryImage({
  src,
  alt,
  srcSet,
  style,
  objectFit = "contain",
  caption,
  ...other
}: GalleryImageProps) {
  function onDragStart(e: React.MouseEvent) {
    e.preventDefault();
  }

  return (
    <div
      className="GalleryImage"
      style={{
        flex: 1,
        display: "flex",
        overflow: "hidden",
        height: "100%",
        ...style
      }}
      {...other}
    >
      <img
        style={{
          maxWidth: "100%",
          height: "auto",
          margin: "0 auto",
          display: "block",
          maxHeight: "100%",
          objectFit
        }}
        onDragStart={onDragStart}
        src={src}
        srcSet={srcSet}
        alt={alt}
      />
    </div>
  );
}
