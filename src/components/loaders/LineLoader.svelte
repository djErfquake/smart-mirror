<div class="loader">
    <div class="line"></div>
</div>

<style>
    .loader {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .line {
        width: 80px;
        height: 40px;
        display: flex;
        color: #ffffff;
    }

    .line:before,
    .line:after {
        content: "";
        margin:0 -2px 0 0;
        flex: 1;
        --c: linear-gradient(currentColor 0 0);
        background: var(--c), var(--c), var(--c), var(--c);
        background-repeat: no-repeat;
        animation: l-1 3s infinite linear, l-2 3s infinite linear;
    }

    .line:after {
        transform: scale(-1);
        margin:0 0 0 -2px;
    }

    @keyframes l-1 {
        0%,
        3%   {background-size: 0   4px,4px 0  ,0   4px,4px 0  }
        12.5%{background-size: 50% 4px,4px 0  ,0   4px,4px 0  }
        25%  {background-size: 50% 4px,4px 50%,0   4px,4px 0  }
        37.5%{background-size: 50% 4px,4px 50%,50% 4px,4px 0  }
        46%,
        54%  {background-size: 50% 4px,4px 50%,50% 4px,4px 50%}
        62.5%{background-size: 0   4px,4px 50%,50% 4px,4px 50%}
        75%  {background-size: 0   4px,4px 0  ,50% 4px,4px 50%}
        87.5%{background-size: 0   4px,4px 0  ,0   4px,4px 50%}
        96%,
        100% {background-size: 0   4px,4px 0  ,0   4px,4px 0  }
    }

    @keyframes l-2 {
        0%,49.9%{background-position:0              20px,50% 20px,20px 100%,100% 100%}
        50%,100%{background-position:right 20px top 20px,50% 100%,100% 100%,100% 20px}
    }
</style>