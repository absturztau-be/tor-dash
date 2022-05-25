<template>
    <div
        class="page-header"
    >
        <div class="logo"></div>
        <span class="logo-text">Node Statistics</span>
    </div>
    <div
        class="container"
    >
        <Descriptor></Descriptor>
        <Bandwidth></Bandwidth>
    </div>
    <div
        class="footer"
    >
        <div
            class="container"
        >
            <div
                class="half"
            >
                Powered by 
                <a
                    href="https://github.com/absturztau-be/tor-dash"
                >
                    tor-dash    
                </a>
            </div>
            <div
                class="half text-right"
            >
                <a
                    href="https://www.torproject.org"
                    target="_blank"
                >
                    The Tor Project
                </a>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript" src="./App.js"></script>

<style lang="scss">
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

html, body {
    padding: 0;
    margin: 0;
}

.page-header {
    padding: 24px;
    margin: 0;
    border-bottom: 0;
    color: white;
    background: linear-gradient(to bottom, #8d56A8 0%, #6d3688 100%);

    .logo {
        height: 50px;
        width: 82px;
        background-color: white;
        vertical-align: text-bottom;
        mask-image: url("../static/img/tor.png");
        mask-repeat: no-repeat;
        mask-size: contain;
        display: inline-block;

        @media (max-width: 768px) {
            height: 30px;
            width: 49px;
        }
    }

    .logo-text {
        height: 50px;
        font-size: 42px;
        margin-left: 10px;
        padding-left: 10px;
        border-left: 3px solid white;
        vertical-align: bottom;
        display: inline-block;

        @media (max-width: 768px) {
            height: 30px;
            font-size: 28px;
        }
    }
}

a {
    color: #68b030;
    text-decoration: none;

    &:visited {
        color: #68b030;
    }

    &:hover {
        text-decoration: underline;
    }
}

.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    h1, h2, h3, h4 {
        color: #7d4698;
        font-weight: bold;
    }

    @media (min-width: 768px) {
        width: 750px;
    }

    @media (min-width: 992px) {
        width: 970px;
    }

    @media (min-width: 1200px) {
        width: 1178px;
    }

}

.text-right {
    text-align: right;
}

.half {
    width: 100%;
    display: inline-block;
    vertical-align: text-top;

    @media (min-width: 768px) {
        width: 50%;
    }
}

.footer {
    margin-top: 2em;
    padding-top: 2em;
    padding-bottom: 2em;
    background-color: #f5f5f5;
    color: #999;
    border-top: 1px solid #ccc;
}
</style>