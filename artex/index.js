class ChatBot {
  constructor(dataset, temperature) {
    this.dataset = dataset;
    this.temperature = temperature;
    this.pattern_set = this.train(dataset);
  }

  train(dataset) {
    let patterns = [];
    for (let key in dataset) {
      let pattern = dataset[key].patterns;
      pattern.forEach((pat) => {
        patterns.push([pat.toLowerCase().split(" "), key]);
      });
    }
    return patterns;
  }

  findMatch(query) {
    let matched = [];
    this.pattern_set.forEach((pattern) => {
      let count = 0;
      query.forEach((word) => {
        pattern[0].includes(word) ? count++ : "";
      });
      matched.push(count);
    });
    return matched;
  }

  calculator(query, matchList) {
    let percentile = [];
    matchList.forEach((matchCount, ind) => {
      let dataset_length = this.pattern_set[ind][0].length;
      let query_length = query.length;
      let percentage =
        (matchCount / Math.max(dataset_length, query_length)) * 100;
      percentile.push([percentage, this.pattern_set[ind][1]]);
    });
    if (percentile.every((pair) => pair[0] === 0)) {
      return [-1];
    }
    const uniqueSet = new Set(percentile.map(JSON.stringify));
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    return uniqueArray;
  }

  filter(percentageList) {
    let filteredList1 = percentageList.filter(
      (elem) => elem[0] >= this.temperature
    );
    if (filteredList1.length == 0) {
      return -1;
    }
    let per = [];
    let cur_per = filteredList1[0][0];
    filteredList1.forEach((el) => {
      if (el[0] == cur_per) {
        per.push(el);
      }

      if (el[0] > cur_per) {
        per = [el];
        cur_per = el[0];
      }
    });
    return per;
  }

  getResponse(filter) {
    if (filter.length > 1) {
      let resp = [];
      filter.forEach((fil) => {
        let resp_array = this.dataset[fil[1]].responses;
        let randomIndex = Math.floor(Math.random() * resp_array.length);
        let respon = resp_array[randomIndex];
        resp.push(respon);
      });
      let final_resp = resp.join(" or ");
      return `Do you mean ${final_resp}?`;
    } else {
      let resp_array = this.dataset[filter[0][1]].responses;
      return [filter[0][1], resp_array[Math.floor(Math.random() * resp_array.length)]];
    }
  }

  chat(query) {
    let tokenisedQuery = query.toLowerCase().split(" ");
    let matched = this.findMatch(tokenisedQuery);
    let percent = this.calculator(tokenisedQuery, matched);
    if (percent == -1) {
      return "Unable to understand your question.";
    }
    let filter = this.filter(percent);
    if (filter == -1) {
      return "Unable to understand your question. Please clarify properly";
    }
    let response = this.getResponse(filter);
    return response;
  }
}

export default ChatBot