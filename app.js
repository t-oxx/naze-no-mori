const banks = {
  '4-6': [
    {subject:'math', tag:'算数', q:'りんごが 3こ と 2こ。ぜんぶで いくつ？', a:['4こ','5こ','6こ'], correct:1, hint:'3から、2つ数えてみよう。'},
    {subject:'english', tag:'English', q:'「cat」は どの どうぶつ？', a:['ねこ','いぬ','さかな'], correct:0, hint:'にゃーにゃー鳴く動物だよ。'},
    {subject:'japanese', tag:'ことば', q:'「おおきい」の はんたいは？', a:['ちいさい','ながい','あかい'], correct:0, hint:'ぞうとありを思いうかべてみよう。'},
    {subject:'social', tag:'くらし', q:'あかしんごうのときは？', a:['わたる','とまる','はしる'], correct:1, hint:'安全のためにどうするかな？'}
  ],
  '7-9': [
    {subject:'math', tag:'算数', q:'48 ÷ 6 は いくつ？', a:['6','7','8'], correct:2, hint:'6を何回足すと48になるかな？'},
    {subject:'english', tag:'English', q:'「blue」は どの色？', a:['あか','あお','きいろ'], correct:1, hint:'空や海の色だよ。'},
    {subject:'japanese', tag:'国語', q:'「先生が 本を 読む。」で、読むのは だれ？', a:['先生','本','読む'], correct:0, hint:'動きをしている人を探そう。'},
    {subject:'social', tag:'社会', q:'地図で病院を表す記号は、どんな形？', a:['十字の形','鳥居の形','郵便マーク'], correct:0, hint:'病院のマークを思い出そう。'}
  ],
  '10-12': [
    {subject:'math', tag:'算数', q:'240円の 25% は 何円？', a:['40円','60円','80円'], correct:1, hint:'25% は 4分の1 と同じだよ。'},
    {subject:'math', tag:'算数', q:'時速 60km で 2時間30分進むと、何km？', a:['120km','150km','180km'], correct:1, hint:'2時間30分は、2.5時間だよ。'},
    {subject:'japanese', tag:'国語', q:'「努力を重ねて、目標を達成した。」の「達成」に近い意味は？', a:['失敗する','やりとげる','忘れる'], correct:1, hint:'目標にたどり着くことだよ。'},
    {subject:'japanese', tag:'国語', q:'次のうち、慣用句「手を焼く」の意味は？', a:['料理をする','扱いに困る','けがをする'], correct:1, hint:'手間がかかって困る様子だよ。'},
    {subject:'english', tag:'English', q:'"I play soccer after school." の意味として正しいものは？', a:['私は放課後サッカーをします。','私は学校でサッカーを見ます。','私は明日サッカーをします。'], correct:0, hint:'after school は「放課後」だよ。'},
    {subject:'english', tag:'English', q:'"go / I / to / school" を正しい順に並べると？', a:['Go I school to.','I go to school.','I school go to.'], correct:1, hint:'英語は主語 I から始めるよ。'},
    {subject:'english', tag:'English', q:'"What do you want?" に合う返事はどれ？', a:['I want juice.','I am ten.','It is Monday.'], correct:0, hint:'何がほしいかを聞いているよ。'},
    {subject:'social', tag:'社会', q:'日本国憲法の三原則に含まれないものは？', a:['国民主権','基本的人権の尊重','身分制度'], correct:2, hint:'すべての人を大切にする考え方を思い出そう。'},
    {subject:'social', tag:'理科', q:'植物が光合成で取り入れる気体は？', a:['酸素','二酸化炭素','窒素'], correct:1, hint:'人が息をはくときに出る気体だよ。'}
  ]
};

function generatedQuestions() {
  const list = { '4-6': [], '7-9': [], '10-12': [] };

  for (let a = 1; a <= 8; a++) for (let b = 1; b <= 10 - a; b++) {
    const answer = a + b;
    list['4-6'].push({ subject:'math', tag:'算数', q:`${a} + ${b} は いくつ？`, a:[String(answer - 1), String(answer), String(answer + 1)], correct:1, hint:`${a}から ${b}こ 数えてみよう。` });
  }
  for (let a = 4; a <= 10; a++) for (let b = 1; b < a; b++) {
    const answer = a - b;
    list['4-6'].push({ subject:'math', tag:'算数', q:`${a} - ${b} は いくつ？`, a:[String(answer), String(answer + 1), String(Math.max(0, answer - 1))], correct:0, hint:`${a}こ から ${b}こ とるよ。` });
  }

  for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) {
    const answer = a * b;
    list['7-9'].push({ subject:'math', tag:'算数', q:`${a} × ${b} は いくつ？`, a:[String(answer - a), String(answer), String(answer + b)], correct:1, hint:`${a}を ${b}回 足すことと同じだよ。` });
  }
  for (let b = 2; b <= 9; b++) for (let a = 2; a <= 9; a++) {
    const answer = a * b;
    list['7-9'].push({ subject:'math', tag:'算数', q:`${answer} ÷ ${a} は いくつ？`, a:[String(b - 1), String(b), String(b + 1)], correct:1, hint:`かけ算に戻して考えてみよう。` });
  }

  [10, 20, 25, 50, 75].forEach(percent => [120, 160, 200, 240, 320, 400, 480].forEach(price => {
    const answer = price * percent / 100;
    list['10-12'].push({ subject:'math', tag:'算数', q:`${price}円の ${percent}% は 何円？`, a:[`${answer / 2}円`, `${answer}円`, `${answer * 2}円`], correct:1, hint:`${percent}% を小数や分数に直してみよう。` });
  }));
  [[3,4],[2,5],[5,8],[7,10],[3,5],[1,4],[4,5]].forEach(([n,d]) => {
    list['10-12'].push({ subject:'math', tag:'算数', q:`${n}/${d} を小数で表すと？`, a:[`${(n/d).toFixed(2)}`, `${(d/n).toFixed(2)}`, `${(n/d + 0.1).toFixed(2)}`], correct:0, hint:'分子を分母でわろう。' });
  });

  const easyEnglish = [['dog','いぬ','ねこ','とり'],['apple','りんご','みかん','ぶどう'],['sun','たいよう','つき','ほし'],['book','ほん','えんぴつ','かばん'],['red','あか','あお','きいろ'],['green','みどり','むらさき','しろ'],['happy','うれしい','かなしい','ねむい'],['water','みず','ぎゅうにゅう','ジュース']];
  easyEnglish.forEach(([word,correct,wrong1,wrong2]) => list['4-6'].push({ subject:'english', tag:'English', q:`「${word}」は どれ？`, a:[correct,wrong1,wrong2], correct:0, hint:'声に出して読んでみよう。' }));
  const middleEnglish = [['Monday','月曜日','金曜日','日曜日'],['breakfast','朝ごはん','昼ごはん','晩ごはん'],['library','図書館','病院','駅'],['teacher','先生','医者','運転手'],['twelve','12','20','2'],['winter','冬','夏','春']];
  middleEnglish.forEach(([word,correct,wrong1,wrong2]) => list['7-9'].push({ subject:'english', tag:'English', q:`「${word}」の意味は？`, a:[correct,wrong1,wrong2], correct:0, hint:'身近な言葉から思い出そう。' }));
  const advancedEnglish = [
    ['"She has two cats." の意味は？','彼女はねこを2ひき飼っています。','彼女は2時に来ます。','彼女はねこになりたいです。'],
    ['"We went to the park yesterday." の意味は？','私たちは昨日公園へ行きました。','私たちは明日公園へ行きます。','私たちは毎日公園で遊びます。'],
    ['"I am studying English now." の意味は？','私は今、英語を勉強しています。','私は英語の先生です。','私は明日英語を話します。'],
    ['"Can you help me?" に合う返事は？','Sure.','I like music.','It is a pen.'],
    ['"How many books do you have?" に合う返事は？','I have three books.','I am fine.','It is sunny.'],
    ['"Where is the station?" に合う返事は？','It is near the park.','I am ten years old.','I like stations.'],
    ['"I want to be a scientist." の意味は？','私は科学者になりたい。','私は科学が苦手だ。','私は科学の本を持っている。'],
    ['"They are playing tennis." の意味は？','彼らはテニスをしています。','彼らはテニスを見ました。','彼らはテニスができません。']
  ];
  advancedEnglish.forEach(([q, answer, wrong1, wrong2]) => list['10-12'].push({ subject:'english', tag:'English', q, a:[answer,wrong1,wrong2], correct:0, hint:'主語と動詞を見つけよう。' }));

  const knowledge = {
    '4-6': [['japanese','ことば','「あめ」の あとの てんきは？',['はれる','ねむる','たべる'],0],['social','くらし','火事のときに 助けを呼ぶ番号は？',['119','110','118'],0],['japanese','ことば','「はやい」の はんたいは？',['おそい','おもい','あつい'],0]],
    '7-9': [['japanese','国語','「美しい」の読み方は？',['うつくしい','たのしい','やさしい'],0],['social','社会','都道府県のうち、いちばん大きい島は？',['北海道','本州','九州'],1],['social','理科','太陽が出る方角は？',['東','西','北'],0],['japanese','国語','「全力」の意味は？',['力のかぎり','全員の力','半分の力'],0]],
    '10-12': [['japanese','国語','「原因」と「結果」の関係として正しいのは？',['理由と起こったこと','昔と未来','問題と答え'],0],['social','社会','国会の主な役割は？',['法律をつくる','天気を調べる','道路をつくる'],0],['social','理科','水が水蒸気に変わることを何という？',['蒸発','凝結','融解'],0],['japanese','国語','「異口同音」の意味は？',['多くの人が同じことを言う','声を出さない','別々の場所へ行く'],0],['social','社会','地球儀で赤道の近くは、一般にどんな気候？',['あたたかい','とても寒い','一年中雪'],0]]
  };
  Object.entries(knowledge).forEach(([range, questions]) => questions.forEach(([subject,tag,q,a,correct]) => list[range].push({subject,tag,q,a,correct,hint:'モヤちゃんと、知っていることを思い出そう。'})));
  return list;
}

const generated = generatedQuestions();
let age = '10-12', subject = 'all', seeds = 0, round = 1, current = null, questionsInSet = 0, correctInSet = 0, forestStage = 0;
let seenQuestions = new Set(), reactionTimer;
const $ = (id) => document.getElementById(id);
const welcome = $('welcome'), game = $('game'), choices = $('choices'), feedback = $('feedback');
const memory = $('memory'), memoryGrid = $('memoryGrid'), memoryComplete = $('memoryComplete');
const idea = $('idea');
const make = $('make');
const makeCelebration = $('makeCelebration');
const puzzle = $('puzzle');
const puzzleCelebration = $('puzzleCelebration');
const coloring = $('coloring');
const coloringScenes = [
  { title:'モヤちゃんの なぜのにわ', asset:'./assets/coloring-moya-preview.png', message:'モヤちゃんの なぜのにわを ぬってみよう' },
  { title:'ピコちゃんの ハートひろば', asset:'./assets/coloring-piko-preview.png', message:'ピコちゃんの まわりを すきな いろに' },
  { title:'ミテちゃんの おはなみち', asset:'./assets/coloring-mite-preview.png', message:'ミテちゃんの おはなみちを かざろう' },
  { title:'ルペくんの ほんのもり', asset:'./assets/coloring-lupe-preview.png', message:'ルペくんの ほんのもりを ぬろう' },
  { title:'ハグちゃんの おはなばたけ', asset:'./assets/coloring-hug-preview.png', message:'ハグちゃんの おはなを きれいに ぬろう' }
];
const coloringColors = ['#f7a9bd','#f6cf69','#96cfe5','#9fcf9a','#bca9dc','#f4a56d'];
let coloringScene = 0, selectedColor = coloringColors[0], coloringBrushSize = 27;
const memoryWords = [
  { word:'apple', picture:'🍎' },
  { word:'cat', picture:'🐱' },
  { word:'dog', picture:'🐶' },
  { word:'star', picture:'⭐' }
];
let memorySoundOn = true, memoryOpen = [], memoryPairs = 0, memoryLocked = false;
const ideaRounds = [
  { prompt:'つぎは どれかな？', sequence:['🍓','🍒','🍓','？'], choices:['🍒','🍎','🍋'], answer:0 },
  { prompt:'おなじ なかまは どれかな？', sequence:['🌙','⭐','🌙'], choices:['🌙','🍓','🐶'], answer:0 },
  { prompt:'つぎは どれかな？', sequence:['☀️','☁️','☀️','？'], choices:['☁️','🌈','🌙'], answer:0 },
  { prompt:'ちがう ひとつは どれかな？', sequence:['🌼','🌼','🍀','🌼'], choices:['🌼','🍀','🌷'], answer:1 },
  { prompt:'つぎは どれかな？', sequence:['🐶','🐱','🐶','？'], choices:['🐱','🐰','🐟'], answer:0 },
  { prompt:'おなじ いろは どれかな？', sequence:['🔵','🔴','🔵'], choices:['🔵','🟡','🟢'], answer:0 },
  { prompt:'ちがう ひとつは どれかな？', sequence:['🍎','🍎','🍋','🍎'], choices:['🍎','🍋','🍓'], answer:1 },
  { prompt:'つぎは どれかな？', sequence:['🌱','🌼','🌱','？'], choices:['🌼','🍀','🌳'], answer:0 },
  { prompt:'おなじ かたちは どれかな？', sequence:['🔺','🟦','🔺'], choices:['🔺','⚪','⭐'], answer:0 },
  { prompt:'ちがう ひとつは どれかな？', sequence:['🚌','🚌','🚲','🚌'], choices:['🚌','🚲','🚗'], answer:1 }
];
let ideaRound = 0;
let selectedMakeItem = 'seed', selectedPlaceScale = 1, plantedSeed = false, gardenGrown = false, waterCount = 0, dryTimer;
const stampArt = {};
const homeArt = {};
const decorArt = {};
const gardenArt = {};
function prepareGardenArt() {
  const sources = { seed:'./assets/nazenomori-seed-source.png', flower:'./assets/nazenomori-flower-source.png', rainbow:'./assets/nazenomori-rainbow-source.png' };
  Object.entries(sources).forEach(([name, path]) => {
    const source = new Image();
    source.onload = () => {
      const canvas = document.createElement('canvas'); canvas.width = 330; canvas.height = 330;
      const ctx = canvas.getContext('2d'); ctx.drawImage(source, 0, 0, 330, 330);
      const data = ctx.getImageData(0, 0, 330, 330);
      for (let i = 0; i < data.data.length; i += 4) if (data.data[i] > 190 && data.data[i + 2] > 170 && data.data[i + 1] < 105) data.data[i + 3] = 0;
      ctx.putImageData(data, 0, 0); gardenArt[name] = canvas.toDataURL('image/png');
      if (name === 'seed') document.querySelector('.stamp-seed').style.backgroundImage = `url("${gardenArt.seed}")`;
    };
    source.src = path;
  });
}
function prepareGardenCompanion() {
  const source = new Image();
  source.onload = () => {
    const canvas = document.createElement('canvas'); canvas.width = 520; canvas.height = 330;
    const ctx = canvas.getContext('2d'); ctx.drawImage(source, 0, 0, 520, 330);
    const data = ctx.getImageData(0, 0, 520, 330);
    for (let i = 0; i < data.data.length; i += 4) if (data.data[i] > 190 && data.data[i + 2] > 170 && data.data[i + 1] < 105) data.data[i + 3] = 0;
    ctx.putImageData(data, 0, 0); $('gardenCompanion').src = canvas.toDataURL('image/png');
  };
  source.src = './assets/garden-moyapiko-watching-v2-source.png';
}
function prepareWateringCan() {
  const source = new Image();
  source.onload = () => {
    const canvas = document.createElement('canvas'); canvas.width = 180; canvas.height = 180;
    const ctx = canvas.getContext('2d'); ctx.drawImage(source, 0, 0, 180, 180);
    const data = ctx.getImageData(0, 0, 180, 180);
    for (let i = 0; i < data.data.length; i += 4) if (data.data[i] > 190 && data.data[i + 2] > 170 && data.data[i + 1] < 105) data.data[i + 3] = 0;
    ctx.putImageData(data, 0, 0); document.querySelector('.watering-can-icon').style.backgroundImage = `url("${canvas.toDataURL('image/png')}")`;
  };
  source.src = './assets/nazenomori-watering-can-source.png';
}
function prepareStampArt() {
  const source = new Image();
  source.onload = () => {
    const cells = { seed:[0,0], apple:[1,0], cherry:[0,1], flower:[1,1], rainbow:[0,2] };
    Object.entries(cells).forEach(([name,[column,row]]) => {
      const canvas = document.createElement('canvas'), cellWidth = source.width / 2, cellHeight = source.height / 3;
      canvas.width = 260; canvas.height = 220;
      const ctx = canvas.getContext('2d'); ctx.drawImage(source, column * cellWidth, row * cellHeight, cellWidth, cellHeight, 0, 0, 260, 220);
      const data = ctx.getImageData(0, 0, 260, 220);
      for (let i = 0; i < data.data.length; i += 4) if (data.data[i] > 190 && data.data[i + 2] > 170 && data.data[i + 1] < 105) data.data[i + 3] = 0;
      ctx.putImageData(data, 0, 0); stampArt[name] = canvas.toDataURL('image/png');
    });
    document.querySelectorAll('.make-tool .stamp-icon').forEach(icon => {
      const name = icon.closest('.make-tool').dataset.item;
      if (stampArt[name] && ['apple','cherry'].includes(name)) Object.assign(icon.style, { backgroundImage:`url("${stampArt[name]}")`, backgroundSize:'contain', backgroundPosition:'center', backgroundRepeat:'no-repeat' });
    });
  };
  source.src = './assets/nazenomori-stamp-sheet-source.png';
}
function prepareHomeArt() {
  const source = new Image();
  source.onload = () => {
    const cells = { moyaHome:[0,0], pikoHome:[1,0], lupeHome:[0,1], hugHome:[1,1] };
    Object.entries(cells).forEach(([name,[column,row]]) => {
      const canvas = document.createElement('canvas'), cellWidth = source.width / 2, cellHeight = source.height / 2;
      canvas.width = 250; canvas.height = 250;
      const ctx = canvas.getContext('2d'); ctx.drawImage(source, column * cellWidth, row * cellHeight, cellWidth, cellHeight, 0, 0, 250, 250);
      const data = ctx.getImageData(0, 0, 250, 250);
      for (let i = 0; i < data.data.length; i += 4) if (data.data[i] > 190 && data.data[i + 2] > 170 && data.data[i + 1] < 105) data.data[i + 3] = 0;
      ctx.putImageData(data, 0, 0); homeArt[name] = canvas.toDataURL('image/png');
    });
    document.querySelectorAll('.make-tool .home-stamp').forEach(icon => {
      const name = icon.closest('.make-tool').dataset.item;
      if (homeArt[name]) Object.assign(icon.style, { backgroundImage:`url("${homeArt[name]}")`, backgroundSize:'contain', backgroundPosition:'center', backgroundRepeat:'no-repeat' });
    });
  };
  source.src = './assets/nazenomori-house-stamps-v2-source.png';
}
function prepareDecorArt() {
  const source = new Image();
  source.onload = () => {
    const cells = { flowerPath:[0,0], lanternTree:[1,0], tree:[1,0], bookBench:[0,1], pond:[1,1] };
    Object.entries(cells).forEach(([name,[column,row]]) => {
      const canvas = document.createElement('canvas'), cellWidth = source.width / 2, cellHeight = source.height / 2;
      canvas.width = 260; canvas.height = 260;
      const ctx = canvas.getContext('2d'); ctx.drawImage(source, column * cellWidth, row * cellHeight, cellWidth, cellHeight, 0, 0, 260, 260);
      const data = ctx.getImageData(0, 0, 260, 260);
      for (let i = 0; i < data.data.length; i += 4) if (data.data[i] > 190 && data.data[i + 2] > 170 && data.data[i + 1] < 105) data.data[i + 3] = 0;
      ctx.putImageData(data, 0, 0); decorArt[name] = canvas.toDataURL('image/png');
    });
    document.querySelectorAll('.make-tool .decor-stamp,.make-tool .tree-stamp').forEach(icon => {
      const name = icon.closest('.make-tool').dataset.item;
      if (decorArt[name]) Object.assign(icon.style, { backgroundImage:`url("${decorArt[name]}")`, backgroundSize:'contain', backgroundPosition:'center', backgroundRepeat:'no-repeat' });
    });
  };
  source.src = './assets/nazenomori-decoration-stamps-source.png';
}
const puzzlePatterns = [
  { name:'くだものの もり', tone:'puzzle-fruit', art:'./assets/puzzle-fruit-forest.png', rotations:[90,180,270,90] },
  { name:'おはなの もり', tone:'puzzle-flower', art:'./assets/puzzle-flower-forest.png', rotations:[270,90,180,270] },
  { name:'ひらめきの もり', tone:'puzzle-star', art:'./assets/nazenomori-forest-bg.png', rotations:[180,270,90,180] },
  { name:'モヤピコの ぎゅー', tone:'puzzle-pink', art:'./assets/correct-hug.png', rotations:[90,270,180,90] },
  { name:'ピコーン！の もり', tone:'puzzle-sky', art:'./assets/correct-highfive.png', rotations:[270,180,90,270] },
  { name:'ミテちゃんの もり', tone:'puzzle-yellow', art:'./assets/correct-stage2.png', rotations:[180,90,270,180] },
  { name:'ルペくんの もり', tone:'puzzle-mint', art:'./assets/correct-stage3.png', rotations:[90,180,270,90] },
  { name:'みんなの もり', tone:'puzzle-lilac', art:'./assets/correct-stage4.png', rotations:[270,90,180,270] },
  { name:'ハグちゃんの もり', tone:'puzzle-peach', art:'./assets/hug.png', rotations:[180,270,90,180] },
  { name:'なかまたちの もり', tone:'puzzle-leaf', art:'./assets/mite.png', rotations:[90,270,180,90] }
];
let puzzleRound = 0, puzzleRotations = [];

function pool() { return [...banks[age], ...generated[age]].filter(item => subject === 'all' || item.subject === subject); }
function showQuestion() {
  const options = pool();
  let available = options.filter(item => !seenQuestions.has(`${age}:${subject}:${item.q}`));
  if (!available.length) { seenQuestions = new Set(); available = options; }
  current = available[Math.floor(Math.random() * available.length)];
  seenQuestions.add(`${age}:${subject}:${current.q}`);
  $('questionText').textContent = current.q; $('subjectTag').textContent = current.tag; $('progress').textContent = `${questionsInSet + 1} / 10`;
  $('moyaLine').textContent = age === '10-12' ? 'これ、どう考える？' : 'これ、なんでだろう？';
  choices.innerHTML = ''; feedback.textContent = ''; feedback.className = 'feedback'; $('nextButton').classList.add('hidden'); $('pikoAnswer').classList.remove('celebrate');
  current.a.forEach((answer, index) => { const button = document.createElement('button'); button.className = 'choice'; button.textContent = answer; button.addEventListener('click', () => answerQuestion(index)); choices.append(button); });
}
function answerQuestion(index) {
  const buttons = [...choices.children]; if (buttons[0].disabled) return; buttons.forEach(button => button.disabled = true);
  buttons[current.correct].classList.add('correct');
  if (index === current.correct) { correctInSet++; seeds++; $('seedCount').textContent = seeds; feedback.textContent = 'ピコーン！ ひらめいたね！'; feedback.classList.add('good'); $('pikoAnswer').classList.add('celebrate'); showReaction(true); }
  else { buttons[index].classList.add('wrong'); feedback.textContent = `モヤちゃんのヒント：${current.hint}`; feedback.classList.add('bad'); showReaction(false); }
  $('nextButton').classList.remove('hidden');
}
function showReaction(isCorrect){
  const overlay = $('reactionOverlay'), visual = $('reactionVisual');
  const baseCorrectImages = ['./assets/correct-hug.png','./assets/correct-highfive.png'];
  const stageCorrect = {
    2: ['./assets/correct-stage2.png', 'ミテちゃんも いっしょに！<br /><b>ひらめいたね！</b>', 'モヤちゃん、ピコちゃん、ミテちゃんが正解をよろこんでいる'],
    3: ['./assets/correct-stage3.png', 'ルペくんも よろこんでる！<br /><b>すごい ひらめき！</b>', 'なぜの森の4人が正解をよろこんでいる'],
    4: ['./assets/correct-stage4.png', 'みんなで ひらめきパーティー！<br /><b>やったね！</b>', 'なぜの森の5人が正解をよろこんでいる']
  };
  const celebration = stageCorrect[forestStage];
  $('reactionImage').src = isCorrect ? (celebration ? celebration[0] : baseCorrectImages[Math.floor(Math.random() * baseCorrectImages.length)]) : './assets/try-again.png';
  $('reactionImage').alt = isCorrect ? (celebration ? celebration[2] : 'モヤちゃんとピコちゃんが正解をよろこんでいる') : 'モヤちゃんとピコちゃんがもう一度考えている';
  $('reactionText').innerHTML = isCorrect ? (celebration ? celebration[1] : 'ピコーン！<br /><b>ひらめいたね！</b>') : 'だいじょうぶ<br /><b>もう一回 考えてみよう</b>';
  visual.classList.toggle('is-wrong', !isCorrect);
  const members = [];
  if (!isCorrect) {
    if (forestStage >= 2) members.push('<img src="./assets/mite-friend.png" alt="" />');
    if (forestStage >= 3) members.push('<img src="./assets/lupe-friend.png" alt="" />');
    if (forestStage >= 4) members.push('<img src="./assets/hug-friend.png" alt="" />');
  }
  $('reactionFriends').innerHTML = members.join('');
  clearTimeout(reactionTimer); overlay.classList.remove('hidden');
  reactionTimer = setTimeout(() => overlay.classList.add('hidden'), isCorrect ? 1650 : 1850);
}
function goHome(){ game.classList.add('hidden'); $('studyAge').classList.add('hidden'); memory.classList.add('hidden'); memoryComplete.classList.add('hidden'); idea.classList.add('hidden'); make.classList.add('hidden'); puzzle.classList.add('hidden'); coloring.classList.add('hidden'); $('coloringCelebration').classList.add('hidden'); makeCelebration.classList.add('hidden'); puzzleCelebration.classList.add('hidden'); $('break').classList.add('hidden'); $('ending').classList.add('hidden'); welcome.classList.remove('hidden'); }
function showEnding(){ $('break').classList.add('hidden'); game.classList.add('hidden'); $('ending').classList.remove('hidden'); }
function speakMemoryWord(word) {
  if (!memorySoundOn || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US'; utterance.rate = .8;
  speechSynthesis.speak(utterance);
}
function memoryBack() {
  return '<div class="memory-card-back memory-hug-back" role="img" aria-label="なぜの森でモヤちゃんとピコちゃんがぎゅっと抱きしめ合っている"></div>';
}
function renderMemoryCards() {
  const cards = [...memoryWords, ...memoryWords].sort(() => Math.random() - .5);
  memoryGrid.innerHTML = '';
  cards.forEach((card, index) => {
    const button = document.createElement('button');
    button.className = 'memory-card'; button.dataset.word = card.word; button.dataset.index = index;
    button.setAttribute('aria-label', 'カードをめくる');
    button.innerHTML = `<span class="memory-card-inner"><span class="memory-card-face memory-card-front"><strong>${card.picture}</strong><b>${card.word}</b></span><span class="memory-card-face memory-card-rear">${memoryBack()}</span></span>`;
    button.addEventListener('click', () => flipMemoryCard(button));
    memoryGrid.append(button);
  });
}
function setMemoryGuide(kind) {
  const character = $('memoryGuideCharacter'), text = $('memoryGuideText');
  if (kind === 'pair') { character.src = './assets/piko.png'; character.alt = 'ピコちゃん'; text.textContent = 'おなじカード、みつけたね！'; }
  else if (kind === 'again') { character.src = './assets/moya.png'; character.alt = 'モヤちゃん'; text.textContent = 'もういちど 見てみよう'; }
  else { character.src = './assets/moya.png'; character.alt = 'モヤちゃん'; text.textContent = 'カードを さわってみよう'; }
}
function flipMemoryCard(button) {
  if (memoryLocked || button.classList.contains('is-open') || button.classList.contains('is-paired')) return;
  button.classList.add('is-open'); memoryOpen.push(button); speakMemoryWord(button.dataset.word);
  if (memoryOpen.length < 2) return;
  memoryLocked = true;
  const [first, second] = memoryOpen;
  if (first.dataset.word === second.dataset.word) {
    setTimeout(() => {
      first.classList.add('is-paired'); second.classList.add('is-paired'); memoryPairs++; $('memoryPairs').textContent = memoryPairs; memoryOpen = []; memoryLocked = false; setMemoryGuide('pair');
      if (memoryPairs === memoryWords.length) setTimeout(() => { memory.classList.add('hidden'); memoryComplete.classList.remove('hidden'); }, 750);
    }, 520);
  } else {
    setTimeout(() => { first.classList.remove('is-open'); second.classList.remove('is-open'); memoryOpen = []; memoryLocked = false; setMemoryGuide('again'); }, 1050);
  }
}
function startMemory() {
  welcome.classList.add('hidden'); game.classList.add('hidden'); idea.classList.add('hidden'); make.classList.add('hidden'); puzzle.classList.add('hidden'); $('break').classList.add('hidden'); $('ending').classList.add('hidden'); memoryComplete.classList.add('hidden');
  memoryPairs = 0; memoryOpen = []; memoryLocked = false; $('memoryPairs').textContent = '0'; setMemoryGuide('start'); renderMemoryCards(); memory.classList.remove('hidden');
}
function startStudy() {
  welcome.classList.add('hidden'); memory.classList.add('hidden'); idea.classList.add('hidden'); make.classList.add('hidden'); puzzle.classList.add('hidden'); $('break').classList.add('hidden'); $('studyAge').classList.remove('hidden');
}
function beginStudy() {
  round = 1; questionsInSet = 0; correctInSet = 0; seenQuestions = new Set(); $('studyAge').classList.add('hidden'); game.classList.remove('hidden'); updateFriendSquad(); showQuestion();
}
function showIdeaRound() {
  const currentIdea = ideaRounds[ideaRound];
  $('ideaCount').textContent = ideaRound + 1; $('ideaPrompt').textContent = currentIdea.prompt;
  $('ideaSequence').innerHTML = currentIdea.sequence.map(item => `<span>${item}</span>`).join('');
  $('ideaFeedback').textContent = ''; $('ideaFeedback').className = 'idea-feedback'; $('ideaNextButton').classList.add('hidden');
  $('ideaChoices').innerHTML = ''; delete $('ideaChoices').dataset.done;
  currentIdea.choices.forEach((choice, index) => {
    const button = document.createElement('button'); button.className = 'idea-choice'; button.textContent = choice;
    button.addEventListener('click', () => {
      if (button.parentElement.dataset.done) return;
      button.parentElement.dataset.done = 'true'; [...$('ideaChoices').children].forEach(item => item.disabled = true);
      if (index === currentIdea.answer) { button.classList.add('picked'); $('ideaFeedback').textContent = 'ピコーン！ みつけたね！'; $('ideaFeedback').classList.add('good'); }
      else { button.classList.add('try'); $('ideaFeedback').textContent = 'モヤちゃんと もう一回 見てみよう'; $('ideaFeedback').classList.add('soft'); }
      $('ideaNextButton').classList.remove('hidden');
    });
    $('ideaChoices').append(button);
  });
}
function startIdea() {
  welcome.classList.add('hidden'); game.classList.add('hidden'); memory.classList.add('hidden'); memoryComplete.classList.add('hidden'); make.classList.add('hidden'); puzzle.classList.add('hidden'); $('break').classList.add('hidden'); $('ending').classList.add('hidden');
  ideaRound = 0; idea.classList.remove('hidden'); showIdeaRound();
}
function startMake() {
  welcome.classList.add('hidden'); game.classList.add('hidden'); memory.classList.add('hidden'); memoryComplete.classList.add('hidden'); idea.classList.add('hidden'); puzzle.classList.add('hidden'); $('break').classList.add('hidden'); $('ending').classList.add('hidden');
  makeCelebration.classList.add('hidden'); clearMake(); make.classList.remove('hidden');
}
function clearMake() { plantedSeed = false; gardenGrown = false; waterCount = 0; clearTimeout(dryTimer); $('makeItems').innerHTML = ''; $('gardenRain').classList.remove('is-raining'); $('makeGarden').classList.remove('is-grown','is-watered','is-drying','is-tended'); $('makeMessage').textContent = 'なぜのたねを うえて、もりを そだてよう'; }
function placeMakeItem(event) {
  const garden = $('makeGarden'), bounds = garden.getBoundingClientRect();
  const left = `${Math.max(4, Math.min(96, (event.clientX - bounds.left) / bounds.width * 100))}%`;
  const pointerTop = Math.max(6, Math.min(91, (event.clientY - bounds.top) / bounds.height * 100));
  // Seeds stay on the soil bed, but can be placed freely anywhere inside it.
  const top = `${selectedMakeItem === 'seed' ? Math.max(58, Math.min(84, pointerTop)) : pointerTop}%`;
  if (selectedMakeItem === 'water') {
    if (!plantedSeed) { $('makeMessage').textContent = 'まずは なぜのたねを うえてみよう'; return; }
    waterCount++;
    const seeds = [...$('makeItems').querySelectorAll('.garden-seed')];
    let sprouted = 0, bloomed = 0;
    seeds.forEach(seed => {
      if (seed.classList.contains('is-grown')) { seed.classList.add('is-tended'); return; }
      const count = Number(seed.dataset.waterCount || 0) + 1; seed.dataset.waterCount = String(count);
      if (count === 1) { seed.classList.add('is-sprouting'); sprouted++; }
      else { seed.classList.remove('is-sprouting'); seed.classList.add('is-grown'); seed.src = gardenArt.flower || seed.src; seed.style.filter = `drop-shadow(0 4px 4px #526d4e45) hue-rotate(${seed.dataset.flowerHue || '0'}deg)`; bloomed++; }
    });
    if (bloomed) { gardenGrown = true; garden.classList.add('is-grown'); $('makeMessage').textContent = `${bloomed}この なぜのはなが さいた！`; }
    else if (sprouted) $('makeMessage').textContent = '雨がしみこんで、なぜのたねが ぷっくりしたよ';
    else { garden.classList.add('is-tended'); $('makeMessage').textContent = '雨をあげるたび、はなも土も いきいきしているよ'; }
    garden.classList.remove('is-drying'); garden.classList.add('is-watered'); const rain = $('gardenRain'); rain.classList.remove('is-raining'); void rain.offsetWidth; rain.classList.add('is-raining'); clearTimeout(dryTimer); dryTimer = setTimeout(() => { garden.classList.remove('is-watered'); garden.classList.add('is-drying'); }, 2800); return;
  }
  const item = document.createElement('img'); item.className = `garden-item garden-${selectedMakeItem}`;
  if (selectedMakeItem === 'lupe') { item.src = './assets/lupe-friend.png'; item.alt = 'ルペくん'; }
  else if (selectedMakeItem === 'seed') { item.src = gardenArt.seed || ''; item.alt = 'なぜのたね'; }
  else { item.src = homeArt[selectedMakeItem] || decorArt[selectedMakeItem] || ''; item.alt = ''; }
  item.style.left = left; item.style.top = top;
  if (selectedMakeItem !== 'seed') item.style.setProperty('--place-scale', selectedPlaceScale);
  if (selectedMakeItem === 'seed') { const seedNumber = $('makeItems').querySelectorAll('.garden-seed').length; item.classList.add('garden-seed'); item.dataset.waterCount = '0'; item.dataset.flowerHue = [0, 48, 105, 168, 235, 292][seedNumber % 6]; plantedSeed = true; $('makeMessage').textContent = 'なぜのたねを うえたよ。おみずを あげてみよう'; }
  else $('makeMessage').textContent = selectedMakeItem === 'lupe' ? 'ルペくんも あそびに きたよ！' : 'いいね！ もっと すてきな にわにしよう';
  $('makeItems').append(item);
}
function renderPuzzle() {
  const currentPuzzle = puzzlePatterns[puzzleRound], board = $('puzzleBoard');
  $('puzzleCount').textContent = puzzleRound + 1; $('puzzleMessage').textContent = `${currentPuzzle.name}：ピースを 4つ タップしよう`; $('puzzleNextButton').classList.add('hidden'); $('puzzlePiko').classList.remove('puzzle-happy');
  board.className = `puzzle-board ${currentPuzzle.tone}`; board.style.setProperty('--puzzle-image', `url("${currentPuzzle.art}")`); board.innerHTML = '';
  puzzleRotations = [...currentPuzzle.rotations];
  puzzleRotations.forEach((rotation, index) => {
    const piece = document.createElement('button'); piece.className = `puzzle-piece piece-${index}`; piece.style.setProperty('--turn', `${rotation}deg`); piece.setAttribute('aria-label', 'ピースをまっすぐにする'); piece.innerHTML = '<span class="puzzle-turn">↻</span>';
    piece.addEventListener('click', () => { if (puzzleRotations[index] === 0) return; puzzleRotations[index] = 0; piece.style.setProperty('--turn', '0deg'); piece.classList.add('is-fixed'); piece.innerHTML = '<span class="puzzle-check">✓</span>'; const fixed = puzzleRotations.filter(item => item === 0).length; if (fixed < 4) $('puzzleMessage').textContent = `ピースを ${fixed} / 4 つ なおしたよ`; checkPuzzle(); });
    board.append(piece);
  });
}
function checkPuzzle() {
  if (!puzzleRotations.every(rotation => rotation === 0)) return;
  const isLastPuzzle = puzzleRound === puzzlePatterns.length - 1;
  $('puzzleMessage').textContent = isLastPuzzle ? '10この もりを つなげたね！ すごい！' : 'つながったね！ できあがりを見てみよう'; $('puzzlePiko').classList.add('puzzle-happy'); $('puzzleBoard').classList.add('is-complete');
  const currentPuzzle = puzzlePatterns[puzzleRound], panel = puzzleCelebration.querySelector('.puzzle-celebration-panel'), boardRect = $('puzzleBoard').getBoundingClientRect();
  const messages = ['つながったね！', 'できた、できた！', 'もりが ひかってる！', 'ピコーン！ きれい！'];
  $('puzzleCelebrationArt').src = currentPuzzle.art; $('puzzleCelebrationText').textContent = isLastPuzzle ? '10こ つながったね！' : messages[puzzleRound % messages.length]; $('puzzleContinueButton').innerHTML = isLastPuzzle ? 'もう一回 あそぶ <span>↻</span>' : 'つぎの えへ <span>→</span>';
  puzzleCelebration.className = `puzzle-celebration variant-${puzzleRound % 4}`;
  panel.style.setProperty('--puzzle-pop-y', `${boardRect.top + boardRect.height * .48}px`); puzzleCelebration.classList.remove('hidden');
}
function startPuzzle() {
  welcome.classList.add('hidden'); game.classList.add('hidden'); memory.classList.add('hidden'); memoryComplete.classList.add('hidden'); idea.classList.add('hidden'); make.classList.add('hidden'); makeCelebration.classList.add('hidden'); puzzleCelebration.classList.add('hidden'); $('break').classList.add('hidden'); $('ending').classList.add('hidden');
  puzzleRound = 0; puzzle.classList.remove('hidden'); renderPuzzle();
}
function setupColorBrush(canvas) {
  const context = canvas.getContext('2d'), scale = window.devicePixelRatio || 1, bounds = canvas.getBoundingClientRect();
  canvas.width = Math.round(bounds.width * scale); canvas.height = Math.round(bounds.height * scale); context.scale(scale, scale); context.fillStyle = '#fffdf8'; context.fillRect(0, 0, bounds.width, bounds.height);
  let drawing = false, lastPoint;
  const point = event => ({ x:event.clientX - bounds.left, y:event.clientY - bounds.top });
  const stroke = event => { if (!drawing) return; const now = point(event); context.strokeStyle = selectedColor; context.lineCap = 'round'; context.lineJoin = 'round'; context.lineWidth = coloringBrushSize; context.beginPath(); context.moveTo(lastPoint.x, lastPoint.y); context.lineTo(now.x, now.y); context.stroke(); lastPoint = now; $('coloringFinish').textContent = 'いいね！ どんどん ぬってみよう'; };
  canvas.onpointerdown = event => { drawing = true; lastPoint = point(event); canvas.setPointerCapture(event.pointerId); stroke(event); };
  canvas.onpointermove = stroke; canvas.onpointerup = canvas.onpointercancel = () => { drawing = false; };
}
function renderColoring() {
  const scene = coloringScenes[coloringScene], canvas = $('coloringCanvas');
  $('coloringSubtitle').textContent = scene.title; $('coloringGuide').textContent = scene.message; $('coloringFinish').textContent = '';
  canvas.className = 'coloring-canvas';
  canvas.innerHTML = `<canvas class="coloring-brush" aria-label="ゆびで いろをぬる"></canvas><img class="coloring-lineart" src="${scene.asset}" alt="${scene.title}のぬりえ" />`;
  setupColorBrush(canvas.querySelector('.coloring-brush'));
  $('coloringSceneDots').innerHTML = coloringScenes.map((item, index) => `<button type="button" class="${index === coloringScene ? 'selected' : ''}" aria-label="${item.title}"></button>`).join('');
  [...$('coloringSceneDots').children].forEach((dot, index) => dot.addEventListener('click', () => { coloringScene = index; renderColoring(); }));
}
function renderColorPalette() {
  $('coloringPalette').innerHTML = coloringColors.map((color, index) => `<button type="button" class="${index === 0 ? 'selected' : ''}" style="--swatch:${color}" aria-label="このいろをえらぶ"></button>`).join('');
  [...$('coloringPalette').children].forEach((button, index) => button.addEventListener('click', () => { selectedColor = coloringColors[index]; [...$('coloringPalette').children].forEach(item => item.classList.toggle('selected', item === button)); }));
}
function startColoring() {
  welcome.classList.add('hidden'); game.classList.add('hidden'); memory.classList.add('hidden'); memoryComplete.classList.add('hidden'); idea.classList.add('hidden'); make.classList.add('hidden'); puzzle.classList.add('hidden'); $('studyAge').classList.add('hidden'); $('break').classList.add('hidden'); $('ending').classList.add('hidden');
  coloringScene = 0; selectedColor = coloringColors[0]; renderColorPalette(); renderColoring(); coloring.classList.remove('hidden');
}
function updateFriendSquad(){
  const squad = $('friendSquad');
  const scenes = {
    0: ['🌱','はじまりの小道','モヤちゃんとピコちゃんの森'],
    1: ['🍃','ひらめきの小道','次は、森の奥へ進もう'],
    2: ['🌼','お花の広場','ミテちゃんと見つける森'],
    3: ['📚','知恵の木の広場','ルペくんと考える森'],
    4: ['☁️','ふわふわの丘','ハグちゃんと笑顔の森']
  };
  const scene = scenes[forestStage] || scenes[4];
  $('stageScene').dataset.stage = forestStage;
  $('stageSceneIcon').textContent = scene[0]; $('stageSceneTitle').textContent = scene[1]; $('stageSceneText').textContent = scene[2];
  document.querySelector('.app-shell').dataset.stage = forestStage;
  if (forestStage < 2) { squad.classList.add('hidden'); return; }
  const friends = [];
  if (forestStage >= 2) friends.push('<img src="./assets/mite-friend.png" alt="ミテちゃん" title="ミテちゃん" />');
  if (forestStage >= 3) friends.push('<img src="./assets/lupe-friend.png" alt="ルペくん" title="ルペくん" />');
  if (forestStage >= 4) friends.push('<img src="./assets/hug-friend.png" alt="ハグちゃん" title="ハグちゃん" />');
  $('friendSquadImages').innerHTML = friends.join('');
  squad.classList.remove('hidden');
}
function showBreak(){
  const passed = correctInSet >= 8;
  const reveal = $('companionReveal');
  $('resultEyebrow').textContent = `10もん中 ${correctInSet}もん 正解！`;
  if (passed) {
    forestStage = Math.min(4, forestStage + 1);
    $('resultTitle').textContent = `ごうかく！ステージ${forestStage}をクリア`;
    $('resultMessage').textContent = '8もん以上の正解、すごい！ひと休みしてから、また森をたんけんしよう。';
    const friends = {
      2: { src:'./assets/mite-friend.png', alt:'ミテちゃん', text:'ミテちゃんが やってきた！\n「見て見て、すごいね！」' },
      3: { src:'./assets/lupe-friend.png', alt:'ルペくん', text:'ルペくんが やってきた！\n「いっしょに考えよう」' },
      4: { src:'./assets/hug-friend.png', alt:'ハグちゃん', text:'ハグちゃんが やってきた！\n「よくがんばったね」' }
    };
    const friend = friends[forestStage];
    if (friend) { $('companionImage').src = friend.src; $('companionImage').alt = friend.alt; $('companionMessage').textContent = friend.text; reveal.classList.remove('hidden'); }
    else reveal.classList.add('hidden');
    updateFriendSquad();
  } else {
    $('resultTitle').textContent = 'あと少し！よく考えたね';
    $('resultMessage').textContent = '合格は10もん中8もん正解。休憩してから、またモヤちゃんとピコちゃんと挑戦しよう。';
    reveal.classList.add('hidden');
  }
  ['mapDot1','mapDot2','mapDot3','mapDot4'].forEach((id, index) => $(id).classList.toggle('done', index < forestStage));
  $('continueButton').innerHTML = forestStage >= 4 && passed ? 'みんなで お家に帰る <span>→</span>' : 'あと10問やる <span>→</span>';
  game.classList.add('hidden'); $('break').classList.remove('hidden');
}
$('memoryHomeButton').addEventListener('click', goHome);
$('ideaHomeButton').addEventListener('click', goHome);
$('makeHomeButton').addEventListener('click', goHome);
$('puzzleHomeButton').addEventListener('click', goHome);
$('coloringHomeButton').addEventListener('click', goHome);
$('coloringResetButton').addEventListener('click', renderColoring);
$('coloringPrevButton').addEventListener('click', () => { coloringScene = (coloringScene + coloringScenes.length - 1) % coloringScenes.length; renderColoring(); });
$('coloringNextButton').addEventListener('click', () => { coloringScene = (coloringScene + 1) % coloringScenes.length; renderColoring(); });
$('coloringCustomColor').addEventListener('input', event => { selectedColor = event.target.value; [...$('coloringPalette').children].forEach(item => item.classList.remove('selected')); });
document.querySelectorAll('.brush-picker button').forEach(button => button.addEventListener('click', () => { coloringBrushSize = Number(button.dataset.brush); document.querySelectorAll('.brush-picker button').forEach(item => item.classList.toggle('selected', item === button)); }));
$('coloringDoneButton').addEventListener('click', () => $('coloringCelebration').classList.remove('hidden'));
$('coloringCelebrationClose').addEventListener('click', () => $('coloringCelebration').classList.add('hidden'));
$('memoryAgainButton').addEventListener('click', startMemory);
$('memoryFinishButton').addEventListener('click', goHome);
$('memorySoundButton').addEventListener('click', () => { memorySoundOn = !memorySoundOn; $('memorySoundButton').textContent = memorySoundOn ? '🔊 ON' : '🔈 OFF'; $('memorySoundButton').setAttribute('aria-pressed', String(memorySoundOn)); });
$('ideaNextButton').addEventListener('click', () => {
  if (ideaRound >= ideaRounds.length - 1) {
    $('ideaPrompt').textContent = 'たくさん みつけたね！'; $('ideaSequence').innerHTML = '<span>✨</span><span>🌈</span><span>✨</span>'; $('ideaChoices').innerHTML = ''; $('ideaFeedback').textContent = 'モヤちゃんとピコちゃんも にこにこ！'; $('ideaFeedback').className = 'idea-feedback good'; $('ideaNextButton').classList.add('hidden'); return;
  }
  ideaRound++; showIdeaRound();
});
$('makeClearButton').addEventListener('click', clearMake);
$('makeGarden').addEventListener('click', placeMakeItem);
$('makeDoneButton').addEventListener('click', () => { const count = $('makeItems').children.length; if (!count) { $('makeMessage').textContent = 'モヤちゃんとピコちゃんと つくってみよう'; return; } $('makeMessage').textContent = 'すてきな もりが できたね！'; makeCelebration.classList.remove('hidden'); });
$('makeCelebrationClose').addEventListener('click', () => { makeCelebration.classList.add('hidden'); clearMake(); });
document.querySelectorAll('.make-tool').forEach(tool => tool.addEventListener('click', () => { selectedMakeItem = tool.dataset.item; document.querySelectorAll('.make-tool').forEach(item => item.classList.toggle('selected', item === tool)); }));
document.querySelectorAll('.house-size').forEach(button => button.addEventListener('click', () => { selectedPlaceScale = Number(button.dataset.scale); document.querySelectorAll('.house-size').forEach(item => item.classList.toggle('selected', item === button)); }));
$('callFriendButton').addEventListener('click', () => {
  const friends = [
    { src:'./assets/mite-friend.png', name:'ミテちゃん' },
    { src:'./assets/lupe-friend.png', name:'ルペくん' },
    { src:'./assets/hug-friend.png', name:'ハグちゃん' }
  ];
  const friend = friends[Math.floor(Math.random() * friends.length)], item = document.createElement('img');
  item.className = 'garden-item garden-visitor'; item.src = friend.src; item.alt = friend.name;
  item.style.left = `${28 + Math.random() * 58}%`; item.style.top = `${24 + Math.random() * 48}%`;
  $('makeItems').append(item); $('makeMessage').textContent = `${friend.name}が あそびに きたよ！`;
});
prepareStampArt();
prepareHomeArt();
prepareDecorArt();
prepareGardenArt();
prepareGardenCompanion();
prepareWateringCan();
$('puzzleNextButton').addEventListener('click', () => { puzzleRound = puzzleRound >= puzzlePatterns.length - 1 ? 0 : puzzleRound + 1; renderPuzzle(); });
$('puzzleContinueButton').addEventListener('click', () => { puzzleCelebration.classList.add('hidden'); puzzleRound = puzzleRound >= puzzlePatterns.length - 1 ? 0 : puzzleRound + 1; renderPuzzle(); });
$('homeButton').addEventListener('click', goHome);
$('nextButton').addEventListener('click', () => { questionsInSet++; if (questionsInSet >= 10) { showBreak(); return; } showQuestion(); });
$('continueButton').addEventListener('click', () => { if (forestStage >= 4) { showEnding(); return; } questionsInSet = 0; correctInSet = 0; $('break').classList.add('hidden'); game.classList.remove('hidden'); showQuestion(); });
$('finishButton').addEventListener('click', goHome);
$('endHomeButton').addEventListener('click', () => { forestStage = 0; updateFriendSquad(); goHome(); });
document.querySelectorAll('.age-button').forEach(button => button.addEventListener('click', () => { age = button.dataset.age; seenQuestions = new Set(); document.querySelectorAll('.age-button').forEach(item => item.classList.toggle('selected', item === button)); }));
$('soundButton').addEventListener('click', () => { if (!current || !('speechSynthesis' in window)) return; speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(current.q); utterance.lang = current.subject === 'english' ? 'en-US' : 'ja-JP'; speechSynthesis.speak(utterance); });
