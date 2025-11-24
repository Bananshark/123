// chat.js - 简化的聊天与模型控制逻辑
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendBtn');
  const questionInput = document.getElementById('question');
  const log = document.getElementById('log');

  sendBtn.addEventListener('click', onSend);
  questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') onSend();
  });

  function onSend() {
    const q = questionInput.value.trim();
    if (!q) return;
    appendLog('你：' + q);
    questionInput.value = '';
    appendLog('AR 助手：正在生成回答...');

    // 模拟调用后端 LLM（示例：你可以替换为真实 API 调用）
    setTimeout(() => {
      const answer = generateMuseumAnswer(q);
      appendLog('AR 助手：' + answer);

      // 模型动作反馈（卡通写实风格：小幅旋转并点头）
      triggerModelAnimation();
    }, 900);
  }

  function appendLog(text) {
    log.innerHTML += '<div>' + text + '</div>';
    log.scrollTop = log.scrollHeight;
  }

  function generateMuseumAnswer(userMsg) {
    // 基于“博物馆志愿者”风格返回简洁正式答案（中文）
    const msg = userMsg.replace(/\s+/g, '').toLowerCase();
    if (msg.includes('是什么') || msg.includes('这是什么')) {
      return '这是一件古代青铜器，通常用于重要祭祀或礼仪场合，器形雕饰反映出当时的工艺与审美。';
    }
    if (msg.includes('年代') || msg.includes('哪个朝代')) {
      return '根据器形和纹饰，这类青铜器大致可归于商周时期（约公元前16世纪至前8世纪）。';
    }
    if (msg.includes('用途') || msg.includes('干什么')) {
      return '此类器物常用于盛放祭祀用物或作为礼仪器具，也可能具有祭祀象征意义。';
    }
    if (msg.includes('发现') || msg.includes('哪里')) {
      return '该器物类似出土于中原地区的重要墓葬或遗址，出土时常伴随丰富随葬品。';
    }
    return '这是很好的问题。一般我们会结合器形、纹饰和出土背景来判断其功能与年代。';
  }

  function triggerModelAnimation() {
    const model = document.querySelector('#artifactModel');
    if (!model) return;

    // small rotate animation
    const startRot = model.getAttribute('rotation') || { x:0, y:180, z:0 };
    const y0 = startRot.y || 180;
    // simple tween-like effect without libs
    let t = 0;
    const duration = 600; // ms
    const targetY = y0 + (Math.random() > 0.5 ? 25 : -25);
    const frame = () => {
      t += 16;
      const p = Math.min(1, t / duration);
      const ease = (--p)*p*p+1; // easeOut
      const curY = y0 + (targetY - y0) * ease;
      model.setAttribute('rotation', `0 ${curY} 0`);
      if (t < duration) requestAnimationFrame(frame);
      else {
        // return to original
        setTimeout(() => model.setAttribute('rotation', `0 ${y0} 0`), 200);
      }
    };
    requestAnimationFrame(frame);
  }

  // Expose helper for integration with remote LLM
  window.arChat = {
    appendLog,
    generateMuseumAnswer
  };
});
