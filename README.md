<ul>
<li class="has-line-data" data-line-start="2" data-line-end="3">NodeJS backend</li>
<li class="has-line-data" data-line-start="3" data-line-end="4">Pure JS frontend</li>
<li class="has-line-data" data-line-start="4" data-line-end="6">Canvas for game table</li>
</ul>
<h2 class="code-line" data-line-start=6 data-line-end=7 ><a id="Frontend_6"></a>Frontend</h2>
<ul>
<li class="has-line-data" data-line-start="7" data-line-end="9">Server rendering on Node js</li>
</ul>
<p class="has-line-data" data-line-start="9" data-line-end="10">We use pure javascript with some experimental properties (for example, private methods). We build frontend using webpark, and provide good browser support (using Babel, Browserify).</p>
<h2 class="code-line" data-line-start=11 data-line-end=12 ><a id="Main_files_11"></a>Main files</h2>
<p class="has-line-data" data-line-start="12" data-line-end="13">Bingo37 game frontend:</p>
<pre><code class="has-line-data" data-line-start="14" data-line-end="16" class="language-sh">api/games/bingo37.js
</code></pre>
<p class="has-line-data" data-line-start="16" data-line-end="17">Bingo37 game API:</p>
<pre><code class="has-line-data" data-line-start="18" data-line-end="20" class="language-sh">api/bingo37_GameClass.js
</code></pre>
<h2 class="code-line" data-line-start=21 data-line-end=22 ><a id="Files_structure_21"></a>Files structure</h2>
<p class="has-line-data" data-line-start="22" data-line-end="23">Folders are written in capital letters.</p>
<ul>
<li class="has-line-data" data-line-start="24" data-line-end="28">API - it’s folder for NodeJS API
<ul>
<li class="has-line-data" data-line-start="25" data-line-end="27">GAMES - it’s folder for different games API
<ul>
<li class="has-line-data" data-line-start="26" data-line-end="27">bingo37.js - it’s bingo37 api</li>
</ul>
</li>
<li class="has-line-data" data-line-start="27" data-line-end="28">index.js - main API file</li>
</ul>
</li>
<li class="has-line-data" data-line-start="28" data-line-end="29">CONFIG - it’s folder for future configuration files</li>
<li class="has-line-data" data-line-start="29" data-line-end="30">OUT - it’s documentation folder</li>
<li class="has-line-data" data-line-start="30" data-line-end="34">PUBLIC - it’s folder for static files: images, scripts, fonts, etc.
<ul>
<li class="has-line-data" data-line-start="31" data-line-end="33">GAMES - games static files
<ul>
<li class="has-line-data" data-line-start="32" data-line-end="33">BINGO37 - binggo37 static files</li>
</ul>
</li>
<li class="has-line-data" data-line-start="33" data-line-end="34">bundle.js - bundle of the main functionality</li>
</ul>
</li>
<li class="has-line-data" data-line-start="34" data-line-end="35">ROUTES - it’s folder for NodeJS routing</li>
<li class="has-line-data" data-line-start="35" data-line-end="39">SRC - it’s folder with source code files (original frontend scripts)
<ul>
<li class="has-line-data" data-line-start="36" data-line-end="37">bingo37.js - game page js</li>
<li class="has-line-data" data-line-start="37" data-line-end="38">bingo37_GameClass.js - main game script</li>
<li class="has-line-data" data-line-start="38" data-line-end="39">index.js - src folder main file</li>
</ul>
</li>
<li class="has-line-data" data-line-start="39" data-line-end="41">VIEWS - here view templates
<ul>
<li class="has-line-data" data-line-start="40" data-line-end="41">LAYOUT - here head&amp;footer templates</li>
</ul>
</li>
<li class="has-line-data" data-line-start="41" data-line-end="42">app.js - main NodeJS file</li>
</ul>
<h3 class="code-line" data-line-start=44 data-line-end=45 ><a id="Installation_44"></a>Installation</h3>
<p class="has-line-data" data-line-start="46" data-line-end="47">Install the dependencies and devDependencies and start the server.</p>
<pre><code class="has-line-data" data-line-start="49" data-line-end="53" class="language-sh">$ <span class="hljs-built_in">cd</span> bingo37
$ npm install <span class="hljs-operator">-d</span>
$ npm start
</code></pre>
<p class="has-line-data" data-line-start="54" data-line-end="55">For generate new documentation (when you change comments in watched files):</p>
<pre><code class="has-line-data" data-line-start="56" data-line-end="58" class="language-sh">$ npm run docs
</code></pre>
<p class="has-line-data" data-line-start="59" data-line-end="60">For generate new bundles (when you change source files in src/ folder):</p>
<pre><code class="has-line-data" data-line-start="61" data-line-end="63" class="language-sh">$ npm run build
</code></pre>