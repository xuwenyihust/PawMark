define([
  'base/js/namespace',
  'base/js/events'
], function(Jupyter, events) {
  function load_ipython_extension() {
      events.on('notebook_loaded.Notebook', function() {
          var cell = Jupyter.notebook.insert_cell_at_index('code', 0);
          cell.set_text(`# Welcome to My Customized Notebook\nimport numpy as np`);
          Jupyter.notebook.select(0);
      });
  }
  return {
      load_ipython_extension: load_ipython_extension
  };
});