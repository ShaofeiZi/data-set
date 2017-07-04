const {
  map
} = require('lodash');
const {
  expect
} = require('chai');
const {
  DataSet,
  getTransform
} = require('../../../index');
const populationChina = require('../../fixtures/population-china.json');

describe('DataView.transform(): map', () => {
  const dataSet = new DataSet();
  let dataView;

  beforeEach(() => {
    dataView = dataSet.createView('test').source(populationChina);
  });

  it('api', () => {
    expect(getTransform('map')).to.be.a('function');
  });

  it('default', () => {
    dataView.transform({
      type: 'map'
    });
    expect(dataView.rows.length).to.equal(populationChina.length);
  });

  it('callback', () => {
    dataView.transform({
      type: 'map',
      callback(row) {
        return row.year; // origin data range: [2002, 2015]
      }
    });
    expect(dataView.rows).to.eql(map(populationChina, row => row.year));
  });
});
