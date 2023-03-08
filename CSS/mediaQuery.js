import styled from 'styled-component'
/**
  https://www.w3schools.com/css/css_rwd_viewport.asp
*/
export const MyDiv = styled.div`
    display: flex;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
    
    @media screen and (max-width: 800px){
        .banner .welcome h2{
            font-size: 15px;
        }
    }

`
