import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

//utilising css from styled-components, for css to be used more than once
const OptionContainerStyles = css`
    padding: 10px 15px;
    cursor: pointer;
`;

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

//Pass react router Link in as argument to wrap the Logo container
export const LogoContainer = styled(Link)`
      height: 100%;
      width: 70px;
      padding: 25px;
`;

export const OptionsContainer = styled.div`
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
`;

//use string interpolation to reuse css
export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`

export const OptionDiv = styled.div`
    ${OptionContainerStyles}    
`