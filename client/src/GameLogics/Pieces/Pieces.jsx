import PropTypes from "prop-types";

import blackPawnIcon from "../Images/black-pawn.png";
import blackKnightIcon from "../Images/black-knight.png";
import blackRookIcon from "../Images/black-rook.png";
import blackBishopIcon from "../Images/black-bishop.png";
import blackKingIcon from "../Images/black-king.png";
import blackQueenIcon from "../Images/black-queen.png";

import whitePawnIcon from "../Images/white-pawn.png";
import whiteKnightIcon from "../Images/white-knight.png";
import whiteRookIcon from "../Images/white-rook.png";
import whiteBishopIcon from "../Images/white-bishop.png";
import whiteKingIcon from "../Images/white-king.png";
import whiteQueenIcon from "../Images/white-queen.png";

import "../App.css";

export const BlackPawn = ({ visibility }) => {
    BlackPawn.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} blackPawn`}
                src={blackPawnIcon}
            ></img>
        </>
    );
};

export const BlackRook = ({ visibility }) => {
    BlackRook.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} blaclRook`}
                src={blackRookIcon}
            ></img>
        </>
    );
};

export const BlackKnight = ({ visibility }) => {
    BlackKnight.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} blackKnight`}
                src={blackKnightIcon}
            ></img>
        </>
    );
};

export const BlackBishop = ({ visibility }) => {
    BlackBishop.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} blackBishop`}
                src={blackBishopIcon}
            ></img>
        </>
    );
};

export const BlackKing = ({ visibility }) => {
    BlackKing.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} blackKing`}
                src={blackKingIcon}
            ></img>
        </>
    );
};

export const BlackQueen = ({ visibility }) => {
    BlackQueen.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} blackQueen`}
                src={blackQueenIcon}
            ></img>
        </>
    );
};

export const WhitePawn = ({ visibility }) => {
    WhitePawn.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} whitePawn`}
                src={whitePawnIcon}
            ></img>
        </>
    );
};

export const WhiteRook = ({ visibility }) => {
    WhiteRook.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} whiteRook`}
                src={whiteRookIcon}
            ></img>
        </>
    );
};

export const WhiteKnight = ({ visibility }) => {
    WhiteKnight.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} whiteKnight`}
                src={whiteKnightIcon}
            ></img>
        </>
    );
};

export const WhiteBishop = ({ visibility }) => {
    WhiteBishop.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} whiteBishop`}
                src={whiteBishopIcon}
            ></img>
        </>
    );
};

export const WhiteKing = ({ visibility }) => {
    WhiteKing.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} whiteKing`}
                src={whiteKingIcon}
            ></img>
        </>
    );
};

export const WhiteQueen = ({ visibility }) => {
    WhiteQueen.propTypes = {
        visibility: PropTypes.string.isRequired,
    };

    return (
        <>
            <img
                className={`piece-icon ${visibility} whiteQueen`}
                src={whiteQueenIcon}
            ></img>
        </>
    );
};
