import React from "react";
import Media from "react-media";
// import { Transition } from "react-transition-group";

import { Icon, IconButton } from "@components/atoms";
import { Overlay } from "@components/organisms/Overlay";
import { xLargeScreen } from "@styles/constants";

import * as S from "./styles";
import { DirectoryItem, IProps } from "./types";

export const TopBar: React.FC<{ onHide: () => void }> = ({
  children,
  onHide,
}) => (
  <S.Bar>
    {children}
    <S.CloseIconWrapper onClick={onHide}>
      <Icon name="horizontal_line" size={22} />
    </S.CloseIconWrapper>
  </S.Bar>
);

export const MenuItem: React.FC<{
  name: string;
  onClick: () => void;
}> = ({ name, onClick }) => {
  return (
    <S.Item>
      <S.NavButton onClick={onClick}>
        <span>{name}</span>
        <S.SubcategoryIcon>
          <Icon name="subcategories" size={10} />
        </S.SubcategoryIcon>
      </S.NavButton>
    </S.Item>
  );
};

export const ChildItem: React.FC<{
  item: DirectoryItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  return (
    <S.ChildItem>
      {/* @ts-ignore */}
      <S.NavLink onClick={onClick} fullWidth type="side" item={item} />
    </S.ChildItem>
  );
};

export const ListItem: React.FC<{
  item: DirectoryItem;
  onClick: () => void;
}> = ({ item, children, onClick }) => {
  return (
    <>
      <S.ListItem>
        <S.TitleNavButton onClick={onClick} item={item}>
          <S.ListTitle>{item.name}</S.ListTitle>
        </S.TitleNavButton>
      </S.ListItem>
      {item.children ? (
        <>
          {item.children?.map((child, index) => (
            <ChildItem onClick={onClick} item={child} />
          ))}
          <S.ListBottomBorder />
        </>
      ) : (
        ""
      )}
    </>
  );
};

/*
// Animation settings
const duration = 250;
/
const defaultStyle = {
  left: "100%",
  transition: `left ${duration}ms ease-in-out`,
};
const transitionStyles = {
  entered: { left: 0 },
  entering: { left: "100%" },
  exited: { left: "100%" },
  exiting: { left: "100%" },
  unmounted: { left: "100%" },
};
*/

export const ProductSideNavbar: React.FC<IProps> = ({
  show,
  onHide,
  items,
  target,
}: IProps) => {
  const handleHide = () => {
    onHide(false);
  };

  /*
  const [view, _setView] = React.useState<IState>({
    buffer: { index: null, depth: null },
    depth: null,
    index: null,
  });

  const setView = React.useCallback((state: Partial<IState>) => {

    _setView(view => ({
      ...view,
      ...state,
      buffer: { ...view.buffer, ...state },
    })); 
  }, []);
  */

  return (
    <Media query={{ maxWidth: xLargeScreen }}>
      <Overlay
        duration={0}
        position="left"
        show={show}
        hide={handleHide}
        target={target}
      >
        <S.Wrapper>
          <S.Header>
            <span>DIRECTORY</span>
            <IconButton
              onClick={() => onHide(false)}
              name="x"
              size={18}
              color="000"
              testingContext="sideNavButton"
            />
          </S.Header>
          <S.ListWrapper>
            <S.ListBottomBorder />
            {items?.map((item, index) => (
              <ListItem
                onClick={() => {
                  handleHide();
                  // setView({ index });
                }}
                item={item}
                key={index}
              />
            ))}
          </S.ListWrapper>
        </S.Wrapper>
      </Overlay>
    </Media>
  );
};

/*
<Transition
  in={view.buffer.index !== null}
  // https://github.com/reactjs/react-transition-group/issues/284
  timeout={{ enter: 0, exit: duration }}
  onExited={() => setView({ index: null, depth: null })}
  unmountOnExit
>
  {state => (
    <S.Menu
      style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}
    >
      <TopBar onHide={handleHide}>
        <S.BackButton
          onClick={() => {
            _setView(view => ({
              ...view,
              buffer: { depth: null, index: null },
            }));
          }}
        >
          <S.IconWrapper>
            <Icon name="arrow_back" size={22} />
          </S.IconWrapper>
          <span>{items[view.index!].name}</span>
        </S.BackButton>
      </TopBar>
      {items[view.index!].children.map((item, depth) =>
        item.children.length > 0 ? (
          <MenuItem
            key={depth}
            onClick={() => {
              setView({ depth });
            }}
            name={item.name}
          />
        ) : (
          <S.NavLink fullWidth type="side" item={item} />
        )
      )}
    </S.Menu>
  )}
</Transition>
<Transition
  in={view.buffer.index !== null && view.buffer.depth !== null}
  // https://github.com/reactjs/react-transition-group/issues/284
  timeout={{ enter: 0, exit: duration }}
  onExited={() => setView({ depth: null })}
  unmountOnExit
>
  {state => (
    <S.Menu
      style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}
    >
      <TopBar onHide={handleHide}>
        <S.BackButton
          onClick={() => {
            _setView(view => ({
              ...view,
              buffer: { ...view.buffer, depth: null },
            }));
          }}
        >
          <S.IconWrapper>
            <Icon name="arrow_back" size={22} />
          </S.IconWrapper>
          <span>{items[view.index!].children[view.depth!].name}</span>
        </S.BackButton>
      </TopBar>
      {items[view.index!].children[view.depth!].children.map(
        (item, i) => (
          <S.NavLink key={i} fullWidth type="side" item={item} />
        )
      )}
    </S.Menu>
  )}
</Transition>
*/
