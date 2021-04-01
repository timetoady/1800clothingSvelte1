<script>
  import { NavItem } from "sveltestrap";
  export let group = undefined;
  export let value = undefined;
</script>

<NavItem>
  <label>
    <input
      bind:group
      {value}
      type="checkbox"
    />
  </label>
</NavItem>

<style>
</style>
