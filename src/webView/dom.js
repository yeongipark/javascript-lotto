const domRefs = {
  $priceForm: document.querySelector(".paper_price_form"),
  $buyButton: document.querySelector(".paper_buy_button"),
  $inputPrice: document.querySelector(".paper_price_input"),
  $lottoInfoWrap: document.querySelector(".paper_lotto_information_wrap"),
  $lottoInfo: document.querySelector(".paper_lotto_information"),
  $lottoCount: document.querySelector(".paper_lotto_count"),
  $winningForm: document.querySelector(".paper_winning_form"),
  $modal: document.querySelector(".result_modal"),
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
};

export default domRefs;
