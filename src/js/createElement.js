export default function createElement() {
  document.body.innerHTML = `
    <div class='container'>
      <div class='timeline'></div>
      <div class='container_content'>
        <div class='content'>
          <input class="input_text" type="text" placeholder="...">
        </div>
      </div>
      <div class='modal_error'></div>
    </div>`;
}
