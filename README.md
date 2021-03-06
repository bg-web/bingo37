<ul>
<li class="has-line-data" data-line-start="1" data-line-end="2">NodeJS backend</li>
<li class="has-line-data" data-line-start="2" data-line-end="3">Pure JS frontend</li>
<li class="has-line-data" data-line-start="3" data-line-end="5">Canvas for game table</li>
</ul>
<h2 class="code-line" data-line-start=5 data-line-end=6 ><a id="Frontend_5"></a>Frontend</h2>
<ul>
<li class="has-line-data" data-line-start="6" data-line-end="8">Server rendering on Node js</li>
</ul>
<p class="has-line-data" data-line-start="8" data-line-end="9">We use pure javascript with some experimental properties (for example, private methods). We build frontend using webpark, and provide good browser support (using Babel, Browserify).</p>
<h2 class="code-line" data-line-start=10 data-line-end=11 ><a id="Main_files_10"></a>Main files</h2>
<p class="has-line-data" data-line-start="11" data-line-end="12">Bingo37 game frontend:</p>
<pre><code class="has-line-data" data-line-start="13" data-line-end="15" class="language-sh">api/games/bingo37.js
</code></pre>
<p class="has-line-data" data-line-start="15" data-line-end="16">Bingo37 game API:</p>
<pre><code class="has-line-data" data-line-start="17" data-line-end="19" class="language-sh">api/bingo37_GameClass.js
</code></pre>
<h2 class="code-line" data-line-start=20 data-line-end=21 ><a id="Files_structure_20"></a>Files structure</h2>
<p class="has-line-data" data-line-start="21" data-line-end="22">Folders are written in capital letters.</p>
<ul>
<li class="has-line-data" data-line-start="23" data-line-end="27">API - it’s folder for NodeJS API
<ul>
<li class="has-line-data" data-line-start="24" data-line-end="26">GAMES - it’s folder for different games API
<ul>
<li class="has-line-data" data-line-start="25" data-line-end="26">bingo37.js - it’s bingo37 api</li>
</ul>
</li>
<li class="has-line-data" data-line-start="26" data-line-end="27">index.js - main API file</li>
</ul>
</li>
<li class="has-line-data" data-line-start="27" data-line-end="28">CONFIG - it’s folder for future configuration files</li>
<li class="has-line-data" data-line-start="28" data-line-end="29">OUT - it’s documentation folder</li>
<li class="has-line-data" data-line-start="29" data-line-end="33">PUBLIC - it’s folder for static files: images, scripts, fonts, etc.
<ul>
<li class="has-line-data" data-line-start="30" data-line-end="32">GAMES - games static files
<ul>
<li class="has-line-data" data-line-start="31" data-line-end="32">BINGO37 - binggo37 static files</li>
</ul>
</li>
<li class="has-line-data" data-line-start="32" data-line-end="33">bundle.js - bundle of the main functionality</li>
</ul>
</li>
<li class="has-line-data" data-line-start="33" data-line-end="34">ROUTES - it’s folder for NodeJS routing</li>
<li class="has-line-data" data-line-start="34" data-line-end="38">SRC - it’s folder with source code files (original frontend scripts)
<ul>
<li class="has-line-data" data-line-start="35" data-line-end="36">bingo37.js - game page js</li>
<li class="has-line-data" data-line-start="36" data-line-end="37">bingo37_GameClass.js - main game script</li>
<li class="has-line-data" data-line-start="37" data-line-end="38">index.js - src folder main file</li>
</ul>
</li>
<li class="has-line-data" data-line-start="38" data-line-end="40">VIEWS - here view templates
<ul>
<li class="has-line-data" data-line-start="39" data-line-end="40">LAYOUT - here head&amp;footer templates</li>
</ul>
</li>
<li class="has-line-data" data-line-start="40" data-line-end="41">app.js - main NodeJS file</li>
</ul>
<h3 class="code-line" data-line-start=43 data-line-end=44 ><a id="Installation_43"></a>Installation</h3>
<p class="has-line-data" data-line-start="45" data-line-end="46">Install the dependencies and devDependencies and start the server.</p>
<pre><code class="has-line-data" data-line-start="48" data-line-end="51" class="language-sh">$ <span class="hljs-built_in">cd</span> bingo37
$ npm install <span class="hljs-operator">-d</span>
</code></pre>
<p class="has-line-data" data-line-start="51" data-line-end="52">Then open app.js and:</p>
<ul>
<li class="has-line-data" data-line-start="52" data-line-end="53">change ip adress and port under comment “// start https server” from 213.139.208.31 to what you want.</li>
<li class="has-line-data" data-line-start="53" data-line-end="55">change paths to ssl certificates in section under comment “// ssl cert”</li>
</ul>
<p class="has-line-data" data-line-start="55" data-line-end="56">Then in command line write:</p>
<pre><code class="has-line-data" data-line-start="57" data-line-end="59" class="language-sh">$ npm start
</code></pre>
<p class="has-line-data" data-line-start="60" data-line-end="61">For generate new documentation (when you change comments in watched files):</p>
<pre><code class="has-line-data" data-line-start="62" data-line-end="64" class="language-sh">$ npm run docs
</code></pre>
<p class="has-line-data" data-line-start="65" data-line-end="66">For generate new bundles (when you change source files in src/ folder):</p>
<pre><code class="has-line-data" data-line-start="67" data-line-end="69" class="language-sh">$ npm run build
</code></pre>