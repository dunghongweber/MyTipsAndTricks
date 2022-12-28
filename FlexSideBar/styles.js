import styled from 'styled-components'

export const SideBarContainer = styled.nav`
  background: #ffffff;
  transition: width 0.5s;
  width: ${(props) => (props.isClose ? '4.5rem' : '15rem')};
  padding: 1.5rem;

  .footer-button {
    cursor: pointer;
    background: #e8e8e9;
    position: fixed;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.isClose ? '4.5rem' : '15rem')};
    text-align: center;
    transition: width 0.5s;
    padding: 0.75rem 0;
  }
`

export const SideBarItem = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    .text {
      color: #5695a6;
    }
  }

  .text {
    white-space: nowrap;
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: ${(props) => (props.isActive ? '#5695a6' : '#183b57')};
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const SideBarSubItem = styled.div`
  display: block;
  padding: 1rem 0 1rem 2rem;
  max-width: 8.5rem;
  font-size: 0.875rem;
  line-height: 1.125rem;
  color: ${(props) => (props.isActive ? '#5695a6' : '#183b57')};
`

