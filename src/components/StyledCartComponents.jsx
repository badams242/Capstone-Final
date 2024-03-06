import styled from "styled-components";

export const CartPageContainer = styled.div`
    background-color: rgb(7, 7, 19);
    color: white;
    padding: 2rem;
    font-family: Arial;
`;

export const CartContainer = styled.div`
    border: 1px solid #333;
    padding: 1rem;

`;

export const CartHeader = styled.h3`
    border-bottom: 2px solid #333;
    padding-bottom: 1rem;
`;

export const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
`;

export const ProductTitle = styled.h4`
    width: 100px;
    text-align: right;
`;
export const ProductPrice = styled.h4``;
export const QuantityControl = styled.div`
    display: flex
    align-items: center
`;

export const Button = styled.button`
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border: none;
    background: rgb(7, 7, 19);
    color: white;
    cursor: pointer;

    &.minus_btn, &.plus_btn, &.removeFromCart_btn {
        background: rgb(57, 57, 69);
    }
`;

export const CartTotal = styled.div`
    margin-top: 1rem;
    font-weight: bold;
`;

