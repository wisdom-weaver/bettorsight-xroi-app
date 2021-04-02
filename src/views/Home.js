import React, { useEffect, useState } from "react";
import bettorsightLogo from '../static/bettorsight-logo-dark.svg'
import { round2, round3 } from '../utils/utils'

function Home() {
  const parts3_style = {
    maxWidth: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  };
  const result2boxes_style = {
    width: "100%",
    maxWidth: "800px",
    marginRight: "auto",
    marginLeft: "auto",
  };

  const [bet_odds, set_bet_odds] = useState("");
  const [same_side, set_same_side] = useState("");
  const [other_side, set_other_side] = useState("");

  const [decimal_1, set_decimal_1] = useState("");
  const [decimal_2, set_decimal_2] = useState("");
  const [decimal_3, set_decimal_3] = useState("");

  const [margin, set_margin] = useState("");
  const [xroi, set_xori] = useState("");

  const calc_decimal = (odds) => {
    console.log(odds);
    if (!odds || isNaN(odds)) return "";
    if (odds > 0) return odds / 100 + 1;
    else return 100 / Math.abs(odds) + 1;
  };

  const calc_margin = ({
    decimal_1,
    decimal_2,
    decimal_3,
    bet_odds,
    same_side,
    other_side,
  }) => {
    if (!decimal_1 || !decimal_2 || !decimal_3) return "";
    return 1 / decimal_2 + 1 / decimal_3;
  };

  const calc_xroi = ({
    decimal_1,
    decimal_2,
    decimal_3,
    bet_odds,
    same_side,
    other_side,
    margin,
  }) => {
    if (!decimal_1 || !decimal_2 || !decimal_3 || !margin) return "";
    return ((decimal_1 / (decimal_2 * margin) - 1)*100);
  };

  useEffect(() => {
    set_decimal_1(calc_decimal(bet_odds));
  }, [bet_odds]);
  useEffect(() => {
    set_decimal_2(calc_decimal(same_side));
  }, [same_side]);
  useEffect(() => {
    set_decimal_3(calc_decimal(other_side));
  }, [other_side]);

  useEffect(() => {
    set_margin(calc_margin({ decimal_1, decimal_2, decimal_3 }));
  }, [decimal_1, decimal_2, decimal_3]);
  useEffect(() => {
    set_xori(calc_xroi({ decimal_1, decimal_2, decimal_3, margin }));
  }, [decimal_1, decimal_2, decimal_3, margin]);

  return (
    <div>
      <div className="spacing-30px"></div>
      <div className="logo-continer">
        <img src={bettorsightLogo} alt="" />
      </div>
      <div className="row-flex">
        <div className="flex-grow-1 center">
          <div style={parts3_style} className="">
            <h5 className="center">bet odds</h5>
            <div className="card round-card">
              <div className="card-content">
                <input
                  className="center"
                  onChange={(e) => set_bet_odds(e.target.value)}
                  type="text"
                  value={bet_odds}
                />
                <p className="center">{decimal_1 && round2(decimal_1) }</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 center">
          <div style={parts3_style} className="">
            <h5 className="center">same side closing</h5>
            <div className="card round-card">
              <div className="card-content">
                <input
                  className="center"
                  onChange={(e) => set_same_side(e.target.value)}
                  type="text"
                  value={same_side}
                />
                <p className="center">{decimal_2 && round2(decimal_2)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 center">
          <div style={parts3_style} className="">
            <h5 className="center">other side closing</h5>
            <div className="card round-card">
              <div className="card-content">
                <input
                  className="center"
                  onChange={(e) => set_other_side(e.target.value)}
                  type="text"
                  value={other_side}
                />
                <p className="center">{decimal_3 && round2(decimal_3)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing-50px"></div>
      <div className="col-flex">
        <div style={result2boxes_style} className="">
          <h5 className="center">Margin</h5>
          <div className="card round-card">
            <div className="card-content">
              <h5 className="center">{(margin && round3(margin)) || '--'}</h5>
            </div>
          </div>
        </div>
        <div className="spacing-50px"></div>
        <div style={result2boxes_style} className="">
          <h5 className="center">Xroi</h5>
          <div className="card round-card">
            <div className="card-content">
            <h5 className="center">{(xroi && <>{round3(xroi)} %</>) || '--'}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
