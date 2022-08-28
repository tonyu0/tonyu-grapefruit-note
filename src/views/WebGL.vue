<template>
    <div id="main">
        <header>WebGL with Typescript playground</header>
        <aside id="index">
            <section>
                <h1>Shader Menu</h1>
                <dl>
                    <dd>
                        <a href="main" title="main">Main page</a>
                    </dd>
                    <dd>
                        <a href="app" title="app">Game Engine App (under construction)</a>
                    </dd>
                    <dd>
                        <a href="page0" title="page0">Page 0</a>
                    </dd>
                    <dd>
                        <a href="page1" title="page1">Page 1</a>
                    </dd>
                    <dd>
                        <a href="glsl" title="glsl">Hanabi</a>
                    </dd>
                </dl>
            </section>
        </aside>
        <div id="content">
            <p><input id="alpha" type="range" min="0" max="100" value="70" /> vertex alpha</p>
            <p>
                <input id="transparency" type="radio" name="blend" checked /> transparency
                <input id="add" type="radio" name="blend" /> add
            </p>
            <!-- here add script for selected feature -->
        </div>
        <footer><a href="https://github.com/tonyu0/webgl-ts">Source on GitHub</a></footer>
    </div>
    <!-- <script type="text/javascript" src="router.js"></script> -->
</template>

<style scoped>
html,
body {
    font: 16px 'MarmeladRegular', Helvetica, Arial, sans-serif;
    color: #ccc;
    background: #555;
    margin: 25px;
    /* margin: 0; */
    overflow: hidden;
}

/* 分からない場所は調べておく */
canvas {
    width: 50%;
    height: 50%;
}

#index {
    width: 200px;
    float: left;
    padding: 5px;
}

#index section > h1 {
    font-size: 120%;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    margin: 0px 0px;
}
#content {
    width: 850px;
    height: 550px;
    float: left;
    border-left: 1px solid #ccc;
    padding: 20px;
}

header,
footer {
    display: block;
    margin-top: 10px;
    clear: both;
}
</style>
