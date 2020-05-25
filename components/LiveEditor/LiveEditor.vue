<template functional>
  <div class="m-6 preview-code">
    <div class="preview-panel">
      <slot name="preview" />
    </div>
    <div class="editor-panel">
      <slot name="editor" />
    </div>
  </div>
</template>

<style>
.preview-code {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid #7bac8e2a;
}
.preview-panel {
  height: auto;
  background: #fff;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
  padding: 10px;
}
.editor-panel {
  height: auto;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  overflow: hidden;
  font-size: 0.85em;
}
</style>