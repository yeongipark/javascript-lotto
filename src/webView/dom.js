const domRefs = {
  $buyButton: document.querySelector(".paper_buy_button"),
  $inputPrice: document.querySelector(".paper_input_price"),
  $$lottoInfoWrap: document.querySelector(".paper_lotto_information_wrap"),
  $lottoInfo: document.querySelector(".paper_lotto_information"),
  $lottoCount: document.querySelector(".paper_lotto_count"),
  $resultButton: document.querySelector(".paper_result_button"),
  modal: document.querySelector(".result_modal"),
  $paper_winning_number_inputs: document.querySelectorAll(
    ".paper_winning_number_input"
  ),
  $paper_bonus_number_input: document.querySelector(
    ".paper_bonus_number_input"
  ),
  $modalCloseButton: document.querySelector(".modal_close_button"),
  $modalRestartButton: document.querySelector(".modal_restart_button"),
  $matchCounts: document.querySelectorAll(".modal_match_count"),
  $winningRate: document.querySelector(".modal_winning_rate"),
  $lottoMachine: null,
};

export default domRefs;
