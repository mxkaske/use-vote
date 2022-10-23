import React from "react";
import { formatDistance } from "date-fns";
import { colorHash } from "src/utils/color";

interface Props {
  colors: Record<string, string>;
  rawData: any;
  rateData: any; // FIXME: any
}

const DataContainer = ({ rateData, rawData, colors }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        {/* FIXME: Data visible even if rateData has no data */}
        <p className="font-bold text-xl">Data</p>
        <div className="flex gap-4 items-center">
          {/* FIXME: reason because it jumps: the key either changes, or automatically gets unmounted as no accIntervalData has been found */}
          {Object.entries(rateData)
            .sort((a, b) => (a[0] > b[0] ? -1 : 1))
            .map(([key, value], i) => {
              return (
                <div key={key} className="flex items-center gap-2">
                  <div
                    style={{
                      backgroundColor: colors[key] || colorHash.hex(key),
                    }}
                    className="h-4 w-4 rounded-full"
                  />
                  <p>
                    {key}: <span className="font-bold">{value as string}</span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      {rawData.length > 0 && (
        <div className="text-right">
          <p className="font-light text-sm">last created</p>
          <p className="font-medium text-sm">
            {formatDistance(
              new Date(rawData[rawData.length - 1].timestamp), // get last data
              new Date(),
              { addSuffix: true }
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default DataContainer;
