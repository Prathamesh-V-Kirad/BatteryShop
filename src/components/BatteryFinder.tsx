import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

type Mode = "vehicle" | "inverter";

export function BatteryFinder() {
  const [mode, setMode] = useState<Mode>("vehicle");

  const [vehicleFilters, setVehicleFilters] = useState({
    vehicleType: "",
    manufacturer: "",
    fuelType: "",
    model: "",
    brand: "",
    state: "",
    city: "",
  });

  const [inverterFilters, setInverterFilters] = useState({
    application: "",
    batteryType: "",
    voltage: "",
    capacity: "",
    brand: "",
  });

  const handleVehicleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!vehicleFilters.vehicleType || !vehicleFilters.manufacturer || !vehicleFilters.state || !vehicleFilters.city) {
      return;
    }

    const params = new URLSearchParams();
    params.append("mode", "vehicle");
    params.append("type", vehicleFilters.vehicleType);
    params.append("manufacturer", vehicleFilters.manufacturer);
    if (vehicleFilters.fuelType) params.append("fuel", vehicleFilters.fuelType);
    if (vehicleFilters.model) params.append("model", vehicleFilters.model);
    if (vehicleFilters.brand) params.append("brand", vehicleFilters.brand);
    params.append("state", vehicleFilters.state);
    params.append("city", vehicleFilters.city);

    window.location.href = `/products?${params.toString()}`;
  };

  const handleInverterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inverterFilters.application || !inverterFilters.batteryType || !inverterFilters.voltage) {
      return;
    }

    const params = new URLSearchParams();
    params.append("mode", "inverter");
    params.append("application", inverterFilters.application);
    params.append("type", inverterFilters.batteryType);
    params.append("voltage", inverterFilters.voltage);
    if (inverterFilters.capacity) params.append("capacity", inverterFilters.capacity);
    if (inverterFilters.brand) params.append("brand", inverterFilters.brand);

    window.location.href = `/products?${params.toString()}`;
  };

  const isVehicleValid =
    vehicleFilters.vehicleType && vehicleFilters.manufacturer && vehicleFilters.state && vehicleFilters.city;

  const isInverterValid = inverterFilters.application && inverterFilters.batteryType && inverterFilters.voltage;

  return (
    <div className="w-full p-6 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl hover:border-white/20 transition-colors">
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-md">
        <button
          onClick={() => setMode("vehicle")}
          className={`flex-1 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
            mode === "vehicle" ? "bg-primary text-primary-foreground shadow-md" : "text-white/60 hover:text-white/80"
          }`}
        >
          Vehicle Battery
        </button>
        <button
          onClick={() => setMode("inverter")}
          className={`flex-1 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
            mode === "inverter" ? "bg-primary text-primary-foreground shadow-md" : "text-white/60 hover:text-white/80"
          }`}
        >
          Inverter Battery
        </button>
      </div>

      {mode === "vehicle" && (
        <form onSubmit={handleVehicleSubmit} className="space-y-4">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Vehicle Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vehicleType"
                  value="two_wheeler"
                  checked={vehicleFilters.vehicleType === "two_wheeler"}
                  onChange={(e) => setVehicleFilters({ ...vehicleFilters, vehicleType: e.target.value })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-white/80">Two Wheeler</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vehicleType"
                  value="four_wheeler"
                  checked={vehicleFilters.vehicleType === "four_wheeler"}
                  onChange={(e) => setVehicleFilters({ ...vehicleFilters, vehicleType: e.target.value })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-white/80">Four Wheeler</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Manufacturer *</label>
            <select
              value={vehicleFilters.manufacturer}
              onChange={(e) => setVehicleFilters({ ...vehicleFilters, manufacturer: e.target.value })}
              className="px-3 py-2 rounded-sm bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Select Manufacturer</option>
              <option value="maruti">Maruti Suzuki</option>
              <option value="hyundai">Hyundai</option>
              <option value="honda">Honda</option>
              <option value="bajaj">Bajaj</option>
              <option value="hero">Hero</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/70 uppercase tracking-wider">State *</label>
              <select
                value={vehicleFilters.state}
                onChange={(e) => setVehicleFilters({ ...vehicleFilters, state: e.target.value })}
                className="px-3 py-2 rounded-sm bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value="">Select State</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="karnataka">Karnataka</option>
                <option value="delhi">Delhi</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/70 uppercase tracking-wider">City *</label>
              <select
                value={vehicleFilters.city}
                onChange={(e) => setVehicleFilters({ ...vehicleFilters, city: e.target.value })}
                className="px-3 py-2 rounded-sm bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value="">Select City</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
                <option value="delhi">Delhi</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isVehicleValid}
            className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-all rounded-md"
          >
            <Search className="h-4 w-4" />
            <span>Find Batteries</span>
          </button>
        </form>
      )}

      {mode === "inverter" && (
        <form onSubmit={handleInverterSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Application *</label>
            <select
              value={inverterFilters.application}
              onChange={(e) => setInverterFilters({ ...inverterFilters, application: e.target.value })}
              className="px-3 py-2 rounded-sm bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Select Application</option>
              <option value="inverter">Inverter</option>
              <option value="solar">Solar</option>
              <option value="ups">UPS</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Battery Type *</label>
            <select
              value={inverterFilters.batteryType}
              onChange={(e) => setInverterFilters({ ...inverterFilters, batteryType: e.target.value })}
              className="px-3 py-2 rounded-sm bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Select Type</option>
              <option value="lead-acid">Lead Acid</option>
              <option value="tubular">Tubular</option>
              <option value="lithium">Lithium</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Voltage *</label>
            <select
              value={inverterFilters.voltage}
              onChange={(e) => setInverterFilters({ ...inverterFilters, voltage: e.target.value })}
              className="px-3 py-2 rounded-sm bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Select Voltage</option>
              <option value="12">12V</option>
              <option value="24">24V</option>
              <option value="48">48V</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!isInverterValid}
            className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-all rounded-md"
          >
            <Search className="h-4 w-4" />
            <span>Find Batteries</span>
          </button>
        </form>
      )}
    </div>
  );
}