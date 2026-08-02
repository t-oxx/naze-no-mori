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
function goHome(){ game.classList.add('hidden'); $('break').classList.add('hidden'); $('ending').classList.add('hidden'); welcome.classList.remove('hidden'); }
function showEnding(){ $('break').classList.add('hidden'); game.classList.add('hidden'); $('ending').classList.remove('hidden'); }
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
$('startButton').addEventListener('click', () => { round = 1; questionsInSet = 0; correctInSet = 0; seenQuestions = new Set(); welcome.classList.add('hidden'); $('break').classList.add('hidden'); game.classList.remove('hidden'); updateFriendSquad(); showQuestion(); });
$('homeButton').addEventListener('click', goHome);
$('nextButton').addEventListener('click', () => { questionsInSet++; if (questionsInSet >= 10) { showBreak(); return; } showQuestion(); });
$('continueButton').addEventListener('click', () => { if (forestStage >= 4) { showEnding(); return; } questionsInSet = 0; correctInSet = 0; $('break').classList.add('hidden'); game.classList.remove('hidden'); showQuestion(); });
$('finishButton').addEventListener('click', goHome);
$('endHomeButton').addEventListener('click', () => { forestStage = 0; updateFriendSquad(); goHome(); });
document.querySelectorAll('.age-button').forEach(button => button.addEventListener('click', () => { age = button.dataset.age; seenQuestions = new Set(); document.querySelectorAll('.age-button').forEach(item => item.classList.toggle('selected', item === button)); }));
$('soundButton').addEventListener('click', () => { if (!current || !('speechSynthesis' in window)) return; speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(current.q); utterance.lang = current.subject === 'english' ? 'en-US' : 'ja-JP'; speechSynthesis.speak(utterance); });
