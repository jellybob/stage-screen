import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Toaster.scss';

// Gradually progresses through popping any children passed in from the edge of the screen
// in turn. Animations are handled by CSS.
function Toaster({ children, downTime = 15000, displayTime = 15000, position = "bottom" }) {
  const [visible, setVisible] = useState(false);
  const [childIndex, setChildIndex] = useState(0);
  const [currentChild, setCurrentChild] = useState(null);

  // Move onto either the next child and make it visible, so it pops into view, or
  // make the child invisible and nullify it so it pops out of view.
  const progress = useCallback(() => {
    if (visible) {
      setVisible(false);
      let nextChildIndex = childIndex === children.length - 1 ? 0 : childIndex + 1;

      setChildIndex(nextChildIndex);
      setCurrentChild(null);
    } else {
      setVisible(true);
      setCurrentChild(children[childIndex]);
    }
  }, [childIndex, visible, children]);

  // Set a timer to call progress at the appropriate moment.
  //
  // Logic seems a bit backwards here, as when the toaster is visible we need
  // to make the next call after downTime because its about to progress to
  // being invisible, and when it isn't visible we progress after displayTime
  // because its about to become visible.
  useEffect(() => {
    let timeout = setTimeout(progress, visible ? downTime : displayTime);
    return () => clearTimeout(timeout);
  }, [progress, visible, downTime, displayTime]);

  function renderChild() {
    if (!currentChild) { return null; }

    let className = [
      `toaster-item-${position}`,
      "toaster-item",
      currentChild.props.className,
    ].join(" ")

    return (
      <CSSTransition key={childIndex} timeout={{ enter: displayTime, exit: downTime }} className={className}>
        { currentChild }
      </CSSTransition>
    );
  }

  return(
    <TransitionGroup>
      { renderChild() }
    </TransitionGroup>
  );
}

Toaster.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  position: PropTypes.oneOf(["top", "bottom"]).isRequired, // Where to display the toaster
  displayTime: PropTypes.number, // How long to display each item for, in ms.
  downTime: PropTypes.number, // How long to remain off screen between items for, in ms.
}
export default Toaster;

