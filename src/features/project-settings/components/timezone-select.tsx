import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";

export const TimezoneSelect = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pacific/Pago_Pago">(GMT-11:00) Pago Pago</SelectItem>
        <SelectItem value="Pacific/Honolulu">
          (GMT-10:00) Hawaii Time
        </SelectItem>
        <SelectItem value="Pacific/Tahiti">(GMT-10:00) Tahiti</SelectItem>
        <SelectItem value="America/Anchorage">
          (GMT-09:00) Alaska Time
        </SelectItem>
        <SelectItem value="America/Los_Angeles">
          (GMT-08:00) Pacific Time
        </SelectItem>
        <SelectItem value="America/Denver">
          (GMT-07:00) Mountain Time
        </SelectItem>
        <SelectItem value="America/Chicago">
          (GMT-06:00) Central Time
        </SelectItem>
        <SelectItem value="America/New_York">
          (GMT-05:00) Eastern Time
        </SelectItem>
        <SelectItem value="America/Halifax">
          (GMT-04:00) Atlantic Time - Halifax
        </SelectItem>
        <SelectItem value="America/Argentina/Buenos_Aires">
          (GMT-03:00) Buenos Aires
        </SelectItem>
        <SelectItem value="America/Sao_Paulo">(GMT-02:00) Sao Paulo</SelectItem>
        <SelectItem value="Atlantic/Azores">(GMT-01:00) Azores</SelectItem>
        <SelectItem value="Europe/London">(GMT+00:00) London</SelectItem>
        <SelectItem value="Europe/Berlin">(GMT+01:00) Berlin</SelectItem>
        <SelectItem value="Europe/Helsinki">(GMT+02:00) Helsinki</SelectItem>
        <SelectItem value="Europe/Istanbul">(GMT+03:00) Istanbul</SelectItem>
        <SelectItem value="Asia/Dubai">(GMT+04:00) Dubai</SelectItem>
        <SelectItem value="Asia/Kabul">(GMT+04:30) Kabul</SelectItem>
        <SelectItem value="Indian/Maldives">(GMT+05:00) Maldives</SelectItem>
        <SelectItem value="Asia/Calcutta">
          (GMT+05:30) India Standard Time
        </SelectItem>
        <SelectItem value="Asia/Kathmandu">(GMT+05:45) Kathmandu</SelectItem>
        <SelectItem value="Asia/Dhaka">(GMT+06:00) Dhaka</SelectItem>
        <SelectItem value="Indian/Cocos">(GMT+06:30) Cocos</SelectItem>
        <SelectItem value="Asia/Bangkok">(GMT+07:00) Bangkok</SelectItem>
        <SelectItem value="Asia/Hong_Kong">(GMT+08:00) Hong Kong</SelectItem>
        <SelectItem value="Asia/Pyongyang">(GMT+08:30) Pyongyang</SelectItem>
        <SelectItem value="Asia/Tokyo">(GMT+09:00) Tokyo</SelectItem>
        <SelectItem value="Australia/Darwin">
          (GMT+09:30) Central Time - Darwin
        </SelectItem>
        <SelectItem value="Australia/Brisbane">
          (GMT+10:00) Eastern Time - Brisbane
        </SelectItem>
        <SelectItem value="Australia/Adelaide">
          (GMT+10:30) Central Time - Adelaide
        </SelectItem>
        <SelectItem value="Australia/Sydney">
          (GMT+11:00) Eastern Time - Melbourne, Sydney
        </SelectItem>
        <SelectItem value="Pacific/Nauru">(GMT+12:00) Nauru</SelectItem>
        <SelectItem value="Pacific/Auckland">(GMT+13:00) Auckland</SelectItem>
        <SelectItem value="Pacific/Kiritimati">
          (GMT+14:00) Kiritimati
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
