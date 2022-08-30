<template>
  <div id="main">
    <header>WebGL with Typescript playground</header>
    <aside id="index">
      <section>
        <h1>Shader Menu</h1>
        <dl>
          <dd>
            <button>Main page</button>
          </dd>
          <dd>
            <button>App</button>
          </dd>
          <dd>
            <button>Page</button>
          </dd>
          <dd>
            <button>GLSL</button>
          </dd>
        </dl>
      </section>
    </aside>
    <WebGLCanvas />
    <a href="https://github.com/tonyu0/webgl-ts">Source on GitHub</a>
  </div>
  <!-- <script type="text/javascript" src="router.js"></script> -->
</template>

<script setup>
  import WebGLCanvas from '@/components/WebGLCanvas.vue';
</script>

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
