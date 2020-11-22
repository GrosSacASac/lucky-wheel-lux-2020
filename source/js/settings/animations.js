export {
    approach,
    rotate,
};

const approach = [
    [
        { backgroundColor: `grey`},
        { backgroundColor: `white` },
    ], {
        duration: 2000,
        fill: `both`,
    },
];

const rotate = [
    [
        { transform: `rotate3d(0,0,0, 0)` },
        { transform: `rotate3d(0,1,0, 89.9deg)`},
    ], {
        duration: 4000,
        fill: `both`,
    },
];