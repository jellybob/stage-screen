import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Toaster.scss';

// Gradually progresses through popping any children passed in from the edge of the screen
// in turn. Animations are handled by CSS.
function Toaster({ children, downTime = 15000, displayTime = 15000, position = "bottom" }) {
  const [childIndex, setChildIndex] = useState(0);
  const [currentChild, setCurrentChild] = useState(children[0]);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!initialised && children.length > 0) {
      exited();
      setInitialised(true);
    }
  }, [initialised, children]);

  function entered() {
    console.log("Entered");
    setTimeout(() => {
      console.log("Callback")
      setCurrentChild(null);
    }, displayTime)
  }

  function exited() {
    console.log("Exited");
    setTimeout(() => {
      console.log(children);
      let nextChildIndex = childIndex === children.length - 1 ? 0 : childIndex + 1;
      setChildIndex(nextChildIndex);
      setCurrentChild(children[childIndex]);
    }, downTime)
  }

  function renderChild() {
    if (!currentChild) { return null; }

    let className = [
      `toaster-item-${position}`,
      "toaster-item",
      currentChild.props.className,
    ].join(" ")

    return (
      <CSSTransition key={childIndex} timeout={{ enter: 1000, exit: 1000 }} onEntered={entered} onExited={exited} className={className}>
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

