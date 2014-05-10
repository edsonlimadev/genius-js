(function() {
	var sequenciaSorteada 	= [];
	var sequenciaInformada	= [];
	var cores				= [];
	var ponteiroAtual 		= 0;
	var jogadas				= 0;
	Genius = {
		container : null,
		buttonsContainer : null,
		buttons : null,
		startButton : null,
		repeatButton : null,
		initRange : 2,
		currentRange : 2,
		initTimeChange : 2,
		init : function(settings, callback) {
			// SETANDO CONFIGURAÇÕES
			Genius.container = settings.container || null;
			Genius.buttonsContainer = settings.buttonsContainer || null;
			Genius.buttons = settings.buttons || null;
			Genius.startButton = settings.startButton || null;
			Genius.repeatButton = settings.repeatButton || null;
			Genius.initRange = settings.initRange || 2;
			Genius.currentRange = settings.currentRange || Genius.initRange;
			Genius.initTimeChange = settings.initTimeChange || 2;
			
			// ATRIBUINDO OS LISTENERS
			Genius.atribuirListeners();
			Genius.mapearCores();

			if(typeof callback != 'undefined')
				callback();
		},
		start : function() {
			Genius.sortearSequencia();
		},
		finishGame : function() {
			alert('Errou Burrão :)');
		},
		mapearCores : function() {
			var btns = Genius.buttons,
				i = 0,
				total = btns.length;

			for(i = 0; i < total; i++)
				cores[i] = $(btns[i]).data('color');
		},
		atribuirListeners : function() {
			var btns = Genius.buttons,
				startB = Genius.startButton,
				repeatB = Genius.repeatButton,
				registrarJogada = Genius.registrarJogada,
				iniciarJogo = Genius.start,
				repetirJogada = Genius.apresentarSequencia,
				total = btns.length,
				i;

			if(startB != null)
				$(startB).on('click', iniciarJogo);

			if(repeatB != null)
				$(repeatB).on('click', repetirJogada);

			for(i = 0; i < total; i++)
				$(btns[i]).on('click', registrarJogada);
		},
		registrarJogada : function() {
			Genius.conferirJogada($(this).data('color'));
		},
		conferirJogada : function(color) {
			if(color == sequenciaSorteada[ponteiroAtual]) {
				ponteiroAtual++;
				if(ponteiroAtual == Genius.currentRange) {
					alert('Acertou Maninho :)');
					ponteiroAtual = 0;
					Genius.currentRange++;
					Genius.start();
				}
			} else {
				Genius.finishGame();
			}
		},
		sortearSequencia : function() {
			var seq = sequenciaSorteada,
				currentRange = Genius.currentRange,
				sortearCor = Genius.sortearCor,
				i,
				total;

			for(i = 0, total = currentRange; i < total; i++)
				seq[i] = sortearCor();

			Genius.apresentarSequencia();
		},
		sortearCor : function() {
			return cores[Genius.sortearNumero()];
		},
		sortearNumero : function () {
			var qtdColors = (Genius.buttons.length - 1),
				numero = Math.round(Math.random(0, qtdColors) * qtdColors);

			return numero;
		},
		apresentarSequencia : function() {
			var btns = Genius.buttons,
				btnsCont = Genius.buttonsContainer,
				time = Genius.initTimeChange,
				i = i || 0,
				ind = 0,
				btn,
				total;

			var apresentacao = setInterval(function() {
				var showColor = Genius.apresentarCor(ind);
				setTimeout(showColor, (time * 1000) - 500);
				if(ind >= sequenciaSorteada.length) {
					clearInterval(apresentacao);
				}
				ind++;
			}, time * 1000);
		},
		apresentarCor : function(posicao) {
			var btns = Genius.buttons,
				btnsCont = Genius.buttonsContainer,
				cor = sequenciaSorteada[posicao],
				i = i || 0,
				btn,
				total,
				retorno;

			for(i = 0, total = btns.length; i < total; i++) {
				$(btns[i]).removeClass('ativo');
				if($(btns[i]).data('color') == cor) {
					btn = $(btns[i]);
					retorno = function() {
						$(btn).addClass('ativo');
						return btn;
					};
				}
			}

			return retorno;
		},
	};
})();