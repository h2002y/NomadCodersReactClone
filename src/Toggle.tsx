import styled from "styled-components";

type Prop = {
  theme: string;
  toggleTheme: Function;
};

const Toggle = (props: Prop) => {
  const isLight = props.theme === "light";
  return (
    <Header>
      <ToggleContainer onClick={() => props.toggleTheme()}>
        <span>{isLight ? "🌛" : "🌞"}</span>
      </ToggleContainer>
    </Header>
  );
};

const ToggleContainer = styled.button`
  margin: 15px;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 8px);
  background: var(--button-bg-color, ${(props) => props.theme.accentColor});
  color: var(--button-color, #ffffff);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 28px;
    text-align: center;
  }
`;

const Header = styled.header`
  width: 100%;
  scroll-margin-top: 5rem;
  height: 75px;
  font-weight: bold;
  display: flex;
  justify-content: right;
  align-items: center;
`;
export default Toggle;
