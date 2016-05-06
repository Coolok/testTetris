var CONSTANTS = {
    GameSpeed: 1,
    GameBgColor: cc.color(255, 255, 255, 250),
    FallenBgColor: cc.color.GRAY,
    SceneName: {
        GAME_SCENE: 'GAME_SCENE'
    },
    LayerName: {
        GAME_LAYER: 'GAME_LAYER'
    },
    FiguresColors: [
        cc.color.BLUE,
        cc.color.GREEN,
        cc.color.YELLOW,
        cc.color.ORANGE,
        cc.color.RED,
        cc.color.MAGENTA,
        cc.color(0, 255, 255, 255)
    ],
    Figures: [
        // S 
        [ //top == Y coordinate//left == X coordinate//
            [{
                top: 0,
                left: 0
            }, {
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 2,
                left: 1
            }], //normal position coordinates
            [{
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 0,
                left: 1
            }, {
                top: 0,
                left: 2
            }] //rotated position coordinates
        ],
        // Z
        [
            [{
                top: 0,
                left: 0
            }, {
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 2
            }],
            [{
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 0
            }, {
                top: 2,
                left: 0
            }]
        ],
        // O
        [
            [{
                top: 0,
                left: 0
            }, {
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 0
            }]
        ],
        // I
        [
            [{
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 2,
                left: 1
            }, {
                top: 3,
                left: 1
            }],
            [{
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 2
            }, {
                top: 1,
                left: 3
            }]
        ],
        // T
        [
            [{
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 2
            }],
            [{
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 2
            }, {
                top: 2,
                left: 1
            }],
            [{
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 2,
                left: 1
            }, {
                top: 1,
                left: 2
            }],
            [{
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 0
            }, {
                top: 2,
                left: 1
            }]
        ],
        // J
        [
            [{
                top: 0,
                left: 2
            }, {
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 2,
                left: 1
            }],
            [{
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 2
            }, {
                top: 2,
                left: 2
            }],
            [{
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 2,
                left: 1
            }, {
                top: 2,
                left: 0
            }],
            [{
                top: 0,
                left: 0
            }, {
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 2
            }]
        ],
        // L
        [
            [{
                top: 0,
                left: 0
            }, {
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 2,
                left: 1
            }],
            [{
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 2
            }, {
                top: 0,
                left: 2
            }],
            [{
                top: 0,
                left: 1
            }, {
                top: 1,
                left: 1
            }, {
                top: 2,
                left: 1
            }, {
                top: 2,
                left: 2
            }],
            [{
                top: 2,
                left: 0
            }, {
                top: 1,
                left: 0
            }, {
                top: 1,
                left: 1
            }, {
                top: 1,
                left: 2
            }]
        ]
    ]

}