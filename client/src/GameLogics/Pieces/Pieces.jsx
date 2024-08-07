import PropTypes from "prop-types";

import blackPawnIcon from "../../Assets/Images/black-pawn.png";
import blackKnightIcon from "../../Assets/Images/black-knight.png";
import blackRookIcon from "../../Assets/Images/black-rook.png";
import blackBishopIcon from "../../Assets/Images/black-bishop.png";
import blackKingIcon from "../../Assets/Images/black-king.png";
import blackQueenIcon from "../../Assets/Images/black-queen.png";

import whitePawnIcon from "../../Assets/Images/white-pawn.png";
import whiteKnightIcon from "../../Assets/Images/white-knight.png";
import whiteRookIcon from "../../Assets/Images/white-rook.png";
import whiteBishopIcon from "../../Assets/Images/white-bishop.png";
import whiteKingIcon from "../../Assets/Images/white-king.png";
import whiteQueenIcon from "../../Assets/Images/white-queen.png";

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
