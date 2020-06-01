/**@jsx jsx */
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import Section from "./Section"
import colors from "../../assets/colors"
import { AiOutlineCloseCircle } from "react-icons/ai"
import mediaQueries from "../../assets/mediaQueries"

export default function Modal({ children, onClick, title, className }) {
  const elRef = useRef(null)
  if (!elRef.current) {
    const div = document.createElement("div")
    elRef.current = div
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal")
    modalRoot.appendChild(elRef.current)

    return () => {
      modalRoot.removeChild(elRef.current)
    }
  }, [])

  return createPortal(
    <ModalBackground>
      <Container className={className}>
        <HeaderS title={title}>
          {title ? <Title>{title}</Title> : null}
          <CloseIcon onClick={onClick}>
            <AiOutlineCloseCircle />
          </CloseIcon>
        </HeaderS>
        {children}
      </Container>
    </ModalBackground>,
    elRef.current
  )
}

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Container = styled(Section)`
  background: ${colors.white};
  border-radius: 3px 3px;
  box-shadow: 1.5px 2px 5px 0px rgba(0, 0, 0, 0.4);
  width: 80vw;
  ${mediaQueries["md"]} {
    width: 50vw;
  }
  ${mediaQueries["lg"]} {
    width: 40vw;
  }
`
const HeaderS = styled.div(({ title }) => ({
  display: "flex",
  justifyContent: Boolean(title) ? "space-between" : "flex-end",
}))

const Title = styled.h3`
  font-size: 1.8rem;
  color: ${colors.black};
  ${mediaQueries["md"]} {
    font-size: 2rem;
  }
`

const CloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;

  svg {
    font-size: 2rem;
  }
`
